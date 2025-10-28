-- Update event description to empty to remove from Stripe checkout
UPDATE events 
SET description = ''
WHERE id = 'c033a641-9687-40a9-99fc-c98dfb9a1b3e';