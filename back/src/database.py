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
            ON CONFLICT (menu, ingredients, user_id) DO NOTHING
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
