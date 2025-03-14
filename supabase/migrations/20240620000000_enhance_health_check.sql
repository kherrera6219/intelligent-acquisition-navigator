
-- Add more detailed health check fields
ALTER TABLE public.health_check 
ADD COLUMN IF NOT EXISTS api_status TEXT DEFAULT 'ok',
ADD COLUMN IF NOT EXISTS db_status TEXT DEFAULT 'ok',
ADD COLUMN IF NOT EXISTS auth_status TEXT DEFAULT 'ok',
ADD COLUMN IF NOT EXISTS details JSONB DEFAULT '{}'::jsonb;

-- Create or replace function to update the health check record
CREATE OR REPLACE FUNCTION public.update_health_check()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the overall status based on component statuses
  IF NEW.api_status = 'error' OR NEW.db_status = 'error' OR NEW.auth_status = 'error' THEN
    NEW.status = 'error';
  ELSIF NEW.api_status = 'warning' OR NEW.db_status = 'warning' OR NEW.auth_status = 'warning' THEN
    NEW.status = 'warning';
  ELSE
    NEW.status = 'ok';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to automatically update the status field
DROP TRIGGER IF EXISTS update_health_check_status ON public.health_check;
CREATE TRIGGER update_health_check_status
BEFORE INSERT OR UPDATE ON public.health_check
FOR EACH ROW EXECUTE FUNCTION public.update_health_check();

-- Update the RLS policies for the health_check table
ALTER TABLE public.health_check ENABLE ROW LEVEL SECURITY;

-- Everyone can read health check status
CREATE POLICY "Anyone can read health check status" 
ON public.health_check 
FOR SELECT 
USING (true);

-- Only authenticated users with admin role can update health check
CREATE POLICY "Only admins can update health check" 
ON public.health_check 
FOR UPDATE 
USING (
  auth.uid() IN (
    SELECT user_id FROM public.user_roles WHERE role = 'admin'
  )
);

-- Only authenticated users with admin role can insert health check
CREATE POLICY "Only admins can insert health check" 
ON public.health_check 
FOR INSERT 
WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM public.user_roles WHERE role = 'admin'
  )
);
