-- Mise à jour de l'événement avec les bonnes informations
UPDATE public.events
SET 
  name = 'Le Club Soleil sur toi',
  description = 'Écrire, ressentir, guérir

Parce que parfois, il faut juste une matinée, un carnet et quelques âmes lumineuses pour remettre du sens là où y en a plus.

Le Club Soleil sur toi n''est pas un atelier d''écriture classique.
C''est un moment suspendu, où tu viens déposer ce que tu ressens, écrire sans jugement, partager ce que tu traverses et repartir plus légèr.e, inspiré.e, aligné.e.

Ce qui t''attend :
Des exercices d''écriture introspective, pour explorer les émotions, les rêves et les blessures avec douceur.
Des discussions sincères, où chaque mot compte et chaque regard soutient.
Un lieu poétique et chaleureux, baigné de lumière, où les bougies, les fleurs et les carnets t''attendent.
Et surtout… une énergie bienveillante et joyeuse, portée par Ibby, pour ne jamais lâcher — tant que le soleil brille…

Et ce n''est pas tout… Chaque participant repartira avec :
Un tote bag "Soleil sur toi",
Un stylo "Soleil sur toi",
Un carnet orange au papier doux,
Et le lendemain, un email comportant des exercices d''écritures composé par Ibby pour prolonger l''expérience et poursuivre ton aventure intérieure depuis chez toi.

Pour qui ?
Pour celles et ceux qui veulent :
se reconnecter à eux-mêmes,
guérir par les mots,
se sentir inspirés, entourés, compris.

Aucun niveau d''écriture requis — seulement l''envie d''être vrai.e. et de se vider.',
  location = 'Café Poésie, 10 Pass. Thiéré, 75011, Paris',
  event_date = '2025-11-16 00:00:00+00',
  price_cents = 6500
WHERE id = 'c033a641-9687-40a9-99fc-c98dfb9a1b3e';

-- Mise à jour des sessions avec les bons horaires et capacités
UPDATE public.event_sessions
SET 
  session_name = 'Créneau 1 (10h00-11h30)',
  start_time = '10:00:00',
  end_time = '11:30:00',
  capacity = 13
WHERE id = '60dc9eec-6261-48bb-b530-cb6f137eb060';

UPDATE public.event_sessions
SET 
  session_name = 'Créneau 2 (12h-13h30)',
  start_time = '12:00:00',
  end_time = '13:30:00',
  capacity = 13
WHERE id = '737be875-de24-40a4-9b94-851fbe5e91d6';