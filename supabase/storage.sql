
INSERT INTO storage.buckets (id, name, public)
VALUES ('user_uploads', 'user_uploads', true);

-- Set up storage policies to allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'user_uploads');

-- Allow users to read their own files
CREATE POLICY "Allow users to read their own files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'user_uploads' AND (storage.foldername(name))[1] = auth.uid()::text);
