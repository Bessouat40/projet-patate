-- Création des tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE weekMenus (
    id SERIAL PRIMARY KEY,
    jour VARCHAR(255),
    phase VARCHAR(255),
    menu VARCHAR(255),
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE menus (
    id SERIAL PRIMARY KEY,
    menu VARCHAR(255),
    ingredients TEXT,
    quantite VARCHAR(255),
    intakes JSON,
    user_id INTEGER REFERENCES users(id)
);

-- Insertion des utilisateurs
INSERT INTO users (username) VALUES ('test');

-- Insertion des menus de la semaine pour l'utilisateur avec id 1
INSERT INTO weekMenus (jour, phase, menu, user_id)
VALUES 
('lundi', 'matin', '', 1),
('lundi', 'midi', '', 1),
('lundi', 'soir', '', 1),
('mardi', 'matin', '', 1),
('mardi', 'midi', '', 1),
('mardi', 'soir', '', 1),
('mercredi', 'matin', '', 1),
('mercredi', 'midi', '', 1),
('mercredi', 'soir', '', 1),
('jeudi', 'matin', '', 1),
('jeudi', 'midi', '', 1),
('jeudi', 'soir', '', 1),
('vendredi', 'matin', '', 1),
('vendredi', 'midi', '', 1),
('vendredi', 'soir', '', 1),
('samedi', 'matin', '', 1),
('samedi', 'midi', '', 1),
('samedi', 'soir', '', 1),
('dimanche', 'matin', '', 1),
('dimanche', 'midi', '', 1),
('dimanche', 'soir', '', 1);
