
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import { corsHeaders } from '../_shared/cors.ts';
import { OpenAI } from 'https://esm.sh/openai@4.29.2';
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openaiApiKey = Deno.env.get('OPENAI_API_KEY')!;
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

const supabase = createClient(supabaseUrl, supabaseAnonKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { query, filters } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Search query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Fetch all document file IDs from Supabase
    let documentsQuery = supabase
      .from('knowledge_documents')
      .select('id, document_name, openai_file_id, file_url, status, created_at, metadata')
      .eq('status', 'processed');
    
    // Apply filters if provided
    if (filters?.category) {
      documentsQuery = documentsQuery.eq('category', filters.category);
    }
    
    const { data: documents, error } = await documentsQuery;
    
    if (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch documents', details: error }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!documents.length) {
      return new Response(
        JSON.stringify({ results: [], message: 'No documents found to search' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Get file IDs for OpenAI search
    const fileIds = documents.map(doc => doc.openai_file_id);
    
    // Search files with OpenAI Assistant API
    const assistant = await openai.beta.assistants.create({
      name: "Knowledge Base Search Assistant",
      instructions: "You help search through PDF documents to find relevant information.",
      model: "gpt-4o-mini",
      tools: [{ type: "retrieval" }],
    });
    
    const thread = await openai.beta.threads.create();
    
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: query,
      file_ids: fileIds,
    });
    
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    });
    
    // Poll for the completion of the run
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    
    // Simple polling mechanism (in a production app, you'd want to use a more sophisticated approach)
    while (runStatus.status !== 'completed' && runStatus.status !== 'failed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }
    
    if (runStatus.status === 'failed') {
      return new Response(
        JSON.stringify({ error: 'OpenAI search failed', details: runStatus }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Get the messages (results)
    const messages = await openai.beta.threads.messages.list(thread.id);
    
    // Get the assistant's response
    const assistantMessages = messages.data.filter(msg => msg.role === 'assistant');
    
    // Clean up by deleting the assistant
    await openai.beta.assistants.del(assistant.id);
    
    // Map the documents with search results
    const results = documents.map(doc => {
      // This is a simple example - in a real app, you'd want to do more sophisticated matching
      const contentMatches = assistantMessages.some(msg => 
        msg.content.some(content => 
          content.type === 'text' && 
          content.text.value.toLowerCase().includes(doc.document_name.toLowerCase())
        )
      );
      
      return {
        ...doc,
        relevance: contentMatches ? 0.95 : 0.5, // Simple relevance scoring
      };
    }).sort((a, b) => b.relevance - a.relevance);
    
    return new Response(
      JSON.stringify({
        results,
        assistantResponse: assistantMessages.map(msg => 
          msg.content.filter(content => content.type === 'text').map(content => content.text.value)
        ).flat(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error searching knowledge:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
