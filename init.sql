CREATE TABLE weekMenus
(
    id SERIAL PRIMARY KEY,
    jour VARCHAR(255),
    phase VARCHAR(255),
    menu VARCHAR(255)
);

INSERT INTO weekMenus (id, jour, phase, menu)
VALUES (default, 'lundi', 'matin', default),
(default, 'lundi', 'midi', default),
(default, 'lundi', 'soir', default),
(default, 'mardi', 'matin', default),
(default, 'mardi', 'midi', default),
(default, 'mardi', 'soir', default),
(default, 'mercredi', 'matin', default),
(default, 'mercredi', 'midi', default),
(default, 'mercredi', 'soir', default),
(default, 'jeudi', 'matin', default),
(default, 'jeudi', 'midi', default),
(default, 'jeudi', 'soir', default),
(default, 'vendredi', 'matin', default),
(default, 'vendredi', 'midi', default),
(default, 'vendredi', 'soir', default),
(default, 'samedi', 'matin', default),
(default, 'samedi', 'midi', default),
(default, 'samedi', 'soir', default),
(default, 'dimanche', 'matin', default),
(default, 'dimanche', 'midi', default),
(default, 'dimanche', 'soir', default);
