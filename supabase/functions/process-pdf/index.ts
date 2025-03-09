
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
    const { pdfUrl, documentName } = await req.json();
    
    if (!pdfUrl) {
      return new Response(
        JSON.stringify({ error: 'PDF URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Fetch the PDF content
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch PDF' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const pdfData = await response.blob();
    
    // Process PDF with OpenAI's file upload and embeddings
    const formData = new FormData();
    formData.append('file', pdfData, 'document.pdf');
    formData.append('purpose', 'assistants');
    
    const openaiFileResponse = await fetch('https://api.openai.com/v1/files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: formData,
    });
    
    const fileData = await openaiFileResponse.json();
    
    if (!openaiFileResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to process PDF with OpenAI', details: fileData }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Store document reference in Supabase
    const { data, error } = await supabase
      .from('knowledge_documents')
      .insert([
        { 
          document_name: documentName || 'Untitled Document',
          openai_file_id: fileData.id,
          file_url: pdfUrl,
          status: 'processed',
          metadata: fileData
        }
      ])
      .select();
    
    if (error) {
      console.error('Supabase error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to store document reference', details: error }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        documentId: data[0].id,
        openaiFileId: fileData.id,
        message: 'PDF processed successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error processing PDF:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
