
-- Create the knowledge_documents table
CREATE TABLE IF NOT EXISTS public.knowledge_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_name TEXT NOT NULL,
  openai_file_id TEXT,
  file_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  category TEXT,
  tags TEXT[],
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE public.knowledge_documents ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for document files if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('knowledge_files', 'Knowledge Files', true)
ON CONFLICT (id) DO NOTHING;

-- Storage bucket policy for public access to read files
CREATE POLICY IF NOT EXISTS "Public Knowledge Files Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'knowledge_files');

-- Storage bucket policy for authenticated users to upload files
CREATE POLICY IF NOT EXISTS "Authenticated Users Can Upload Knowledge Files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'knowledge_files');

-- Set up trigger for updated_at
CREATE TRIGGER update_knowledge_documents_updated_at
BEFORE UPDATE ON public.knowledge_documents
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Allow authenticated users to select knowledge documents
CREATE POLICY IF NOT EXISTS "Authenticated Users Can View Knowledge Documents"
ON public.knowledge_documents FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to insert knowledge documents
CREATE POLICY IF NOT EXISTS "Authenticated Users Can Insert Knowledge Documents"
ON public.knowledge_documents FOR INSERT
TO authenticated
WITH CHECK (true);
