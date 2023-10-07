CREATE TABLE weekMenus
(
    id SERIAL PRIMARY KEY,
    jour VARCHAR(255),
    phase VARCHAR(255),
    menu VARCHAR(255)
);

INSERT INTO weekMenus (id, jour, phase, menu)
VALUES (default, 'lundi', 'matin', 'lundi matin'),
(default, 'lundi', 'midi', 'lundi midi'),
(default, 'lundi', 'soir', 'lundi soir'),
(default, 'mardi', 'matin', 'mardi matin'),
(default, 'mardi', 'midi', 'mardi midi'),
(default, 'mardi', 'soir', 'mardi soir'),
(default, 'mercredi', 'matin', 'mercredi matin'),
(default, 'mercredi', 'midi', 'mercredi midi'),
(default, 'mercredi', 'soir', 'mercredi soir'),
(default, 'jeudi', 'matin', 'jeudi matin'),
(default, 'jeudi', 'midi', 'jeudi midi'),
(default, 'jeudi', 'soir', 'jeudi soir'),
(default, 'vendredi', 'matin', 'vendredi matin'),
(default, 'vendredi', 'midi', 'vendredi midi'),
(default, 'vendredi', 'soir', 'vendredi soir'),
(default, 'samedi', 'matin', 'samedi matin'),
(default, 'samedi', 'midi', 'samedi midi'),
(default, 'samedi', 'soir', 'samedi soir'),
(default, 'dimanche', 'matin', 'dimanche matin'),
(default, 'dimanche', 'midi', 'dimanche midi'),
(default, 'dimanche', 'soir', 'dimanche soir');
