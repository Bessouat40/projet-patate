from sqlalchemy import create_engine, text
from dotenv import load_dotenv, find_dotenv
from os import environ
import json

load_dotenv(find_dotenv())

POSTGRES_USER=environ.get("POSTGRES_USER")
POSTGRES_PASSWORD=environ.get("POSTGRES_PASSWORD")
POSTGRES_DB=environ.get("POSTGRES_DB")
HOST=environ.get("HOST")
PORT=environ.get("PORT")

class Database() :
    
    def __init__(self):

        self.engine = create_engine(f"postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{HOST}:{PORT}/{POSTGRES_DB}")
        self.conn = self.engine.connect()
        self.add_data = []

    def require(self) :
        """Require informations to Postgres database

                Returns:
            data: data stored in Postgres database
        """
        query1 = text("SELECT * FROM weekMenus")
        query2 = text("SELECT * FROM menus")
        weekMenus = self.conn.execute(query1).fetchall()
        menus = self.conn.execute(query2).fetchall()
        return weekMenus, menus
    
    def addMenuToDayPhase(self, menu, day, phase, menuDetails) :
        ingredients, quantite = [], []
        menuDetails = json.loads(menuDetails)
        for aliment in menuDetails :
            ingredients.append(aliment["ALIMENT"].replace("'", " "))
            quantite.append(aliment["QUANTITY"])
        ingredients = '#@&@#'.join(ingredients)
        quantite = ','.join(quantite)
        query1 = text(f"UPDATE weekMenus SET menu='{menu}' WHERE weekMenus.phase='{phase}' AND weekMenus.jour='{day}'")
        query2 = text(f"INSERT INTO menus (id, menu, ingredients, quantite) VALUES (default, '{menu}', '{ingredients}', '{quantite}')")
        self.conn.execute(query1)
        self.conn.execute(query2)
