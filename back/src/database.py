from sqlalchemy import create_engine, text
from dotenv import load_dotenv, find_dotenv
from os import environ
import json

load_dotenv(find_dotenv())

POSTGRES_USER = environ.get("POSTGRES_USER")
POSTGRES_PASSWORD = environ.get("POSTGRES_PASSWORD")
POSTGRES_DB = environ.get("POSTGRES_DB")
HOST = environ.get("HOST")
PORT = environ.get("PORT")

class Database:
    def __init__(self):
        self.engine = create_engine(f"postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{HOST}:{PORT}/{POSTGRES_DB}")
        self.conn = self.engine.connect()
    
    def require(self, user_id):
        """Require informations to Postgres database"""
        query1 = text("SELECT * FROM weekMenus WHERE user_id = :user_id")
        query2 = text("SELECT * FROM menus WHERE user_id = :user_id")
        with self.engine.begin() as connection:
            weekMenus = connection.execute(query1, {"user_id": user_id}).fetchall()
            menus = connection.execute(query2, {"user_id": user_id}).fetchall()
        return weekMenus, menus

    def add_new_user_and_initialize_week_menus(self, user_id, username):
        """Add a new user and initialize weekMenus if the user does not exist"""
        check_user_query_by_id = text("SELECT * FROM users WHERE id = :user_id")
        check_user_query_by_name = text("SELECT * FROM users WHERE username = :username")
        add_user_query = text("INSERT INTO users (id, username) VALUES (:user_id, :username)")
        initialize_week_menus_query = text("""
            INSERT INTO weekMenus (jour, phase, menu, user_id)
            VALUES 
            ('lundi', 'matin', '', :user_id),
            ('lundi', 'midi', '', :user_id),
            ('lundi', 'soir', '', :user_id),
            ('mardi', 'matin', '', :user_id),
            ('mardi', 'midi', '', :user_id),
            ('mardi', 'soir', '', :user_id),
            ('mercredi', 'matin', '', :user_id),
            ('mercredi', 'midi', '', :user_id),
            ('mercredi', 'soir', '', :user_id),
            ('jeudi', 'matin', '', :user_id),
            ('jeudi', 'midi', '', :user_id),
            ('jeudi', 'soir', '', :user_id),
            ('vendredi', 'matin', '', :user_id),
            ('vendredi', 'midi', '', :user_id),
            ('vendredi', 'soir', '', :user_id),
            ('samedi', 'matin', '', :user_id),
            ('samedi', 'midi', '', :user_id),
            ('samedi', 'soir', '', :user_id),
            ('dimanche', 'matin', '', :user_id),
            ('dimanche', 'midi', '', :user_id),
            ('dimanche', 'soir', '', :user_id)
        """)

        with self.engine.begin() as connection:
            user_by_id = connection.execute(check_user_query_by_id, {"user_id": user_id}).fetchone()
            if user_by_id:
                print(f"Utilisateur {username} déjà existant via ID = {user_id}")
                return

            user_by_name = connection.execute(check_user_query_by_name, {"username": username}).fetchone()
            if user_by_name:
                print(f"Username '{username}' déjà utilisé, aucun nouvel enregistrement.")
                return

        connection.execute(add_user_query, {"user_id": user_id, "username": username})
        connection.execute(initialize_week_menus_query, {"user_id": user_id})
        print(f"Utilisateur {username} ajouté avec des weekMenus initialisés.")
    
    def addMenuToDayPhase(self, menu, day, phase, menuDetails, intakes, user_id):
        """Add menu to the day and phase"""
        ingredients, quantite = [], []
        menuDetails = json.loads(menuDetails)
        for aliment in menuDetails:
            ingredients.append(aliment["ALIMENT"].replace("'", " "))
            quantite.append(str(aliment["QUANTITY"]))
        ingredients = '#@&@#'.join(ingredients)
        quantite = ','.join(quantite)
        
        query1 = text("""
            UPDATE weekMenus
            SET menu = :menu
            WHERE phase = :phase AND jour = :day AND user_id = :user_id
        """)
        query2 = text("""
            INSERT INTO menus (menu, ingredients, quantite, intakes, user_id)
            VALUES (:menu, :ingredients, :quantite, :intakes, :user_id)
            ON CONFLICT (menu, ingredients, quantite, user_id) DO NOTHING
        """)
        
        with self.engine.begin() as connection:
            connection.execute(query1, {"menu": menu, "phase": phase, "day": day, "user_id": user_id})
            connection.execute(query2, {
                "menu": menu,
                "ingredients": ingredients,
                "quantite": quantite,
                "intakes": intakes,
                "user_id": user_id
            })
    
    def delete_menu_from_menu_list(self, menu_name, user_id):
        """Delete a menu from the menu list"""
        query1 = text("""
            UPDATE weekMenus
            SET menu = ''
            WHERE menu = :menu AND user_id = :user_id
        """)
        query2 = text("""
            DELETE FROM menus
            WHERE menu = :menu AND user_id = :user_id
        """)
        
        with self.engine.begin() as connection:
            connection.execute(query1, {"menu": menu_name, "user_id": user_id})
            connection.execute(query2, {"menu": menu_name, "user_id": user_id})
    
    def delete_menu_from_week_calendar(self, menu_name, phase, jour, user_id):
        """Delete a menu from the week calendar"""
        query = text("""
            UPDATE weekMenus
            SET menu = ''
            WHERE menu = :menu AND jour = :jour AND phase = :phase AND user_id = :user_id
        """)
        
        with self.engine.begin() as connection:
            connection.execute(query, {"menu": menu_name, "jour": jour, "phase": phase, "user_id": user_id})
