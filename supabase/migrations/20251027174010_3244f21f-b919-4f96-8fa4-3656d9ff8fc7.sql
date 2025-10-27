-- Remove the overly permissive RLS policy that exposes all tickets publicly
DROP POLICY IF EXISTS "Tickets can be verified by token" ON public.tickets;

-- The existing policy "Users can view their own tickets" remains active
-- It restricts access to authenticated users viewing only their own tickets via email match
-- The verify-ticket Edge Function uses service_role_key and bypasses RLS, so it continues to work