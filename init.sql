CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS weekMenus CASCADE;
CREATE TABLE weekMenus (
    id SERIAL PRIMARY KEY,
    jour VARCHAR(255),
    phase VARCHAR(255),
    menu VARCHAR(255),
    user_id VARCHAR(255) REFERENCES users(id)
);

DROP TABLE IF EXISTS menus CASCADE;
CREATE TABLE menus (
    id SERIAL PRIMARY KEY,
    menu VARCHAR(255),
    ingredients TEXT,
    quantite VARCHAR(255),
    intakes JSON,
    user_id VARCHAR(255) REFERENCES users(id),
    CONSTRAINT unique_menu_ingredients_user UNIQUE (menu, ingredients, quantite, user_id)
);
