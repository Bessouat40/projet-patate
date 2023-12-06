CREATE TABLE weekMenus
(
    id SERIAL PRIMARY KEY,
    jour VARCHAR(255),
    phase VARCHAR(255),
    menu VARCHAR(255)
);

CREATE TABLE menus
(
    id SERIAL PRIMARY KEY,
    menu VARCHAR(255),
    ingredients TEXT,
    quantite VARCHAR(255),
    intakes JSON
);

INSERT INTO weekMenus (id, jour, phase, menu)
VALUES (default, 'lundi', 'matin', ''),
(default, 'lundi', 'midi', ''),
(default, 'lundi', 'soir', ''),
(default, 'mardi', 'matin', ''),
(default, 'mardi', 'midi', ''),
(default, 'mardi', 'soir', ''),
(default, 'mercredi', 'matin', ''),
(default, 'mercredi', 'midi', ''),
(default, 'mercredi', 'soir', ''),
(default, 'jeudi', 'matin', ''),
(default, 'jeudi', 'midi', ''),
(default, 'jeudi', 'soir', ''),
(default, 'vendredi', 'matin', ''),
(default, 'vendredi', 'midi', ''),
(default, 'vendredi', 'soir', ''),
(default, 'samedi', 'matin', ''),
(default, 'samedi', 'midi', ''),
(default, 'samedi', 'soir', ''),
(default, 'dimanche', 'matin', ''),
(default, 'dimanche', 'midi', ''),
(default, 'dimanche', 'soir', '');
