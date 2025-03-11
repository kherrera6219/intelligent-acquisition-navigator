
-- Create a health check table for connection testing
CREATE TABLE IF NOT EXISTS public.health_check (
  id SERIAL PRIMARY KEY,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a single row that we can always query
INSERT INTO public.health_check (count)
VALUES (0)
ON CONFLICT DO NOTHING;

-- Allow anyone to read the health check data
ALTER TABLE public.health_check ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anyone to read health_check data"
ON public.health_check
FOR SELECT
TO PUBLIC
USING (true);
