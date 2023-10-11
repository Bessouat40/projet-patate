from sqlalchemy import create_engine, text
from dotenv import load_dotenv, find_dotenv
from os import environ


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
        query = text("SELECT * FROM weekMenus")
        data = self.conn.execute(query).fetchall()
        return data
    
    def addMenuToDayPhase(self, menu, day, phase) :
        print('day : ', day)
        print('phase : ', phase)
        print('menu : ', menu)
        query = text(f"UPDATE weekMenus SET menu='{menu}' WHERE weekMenus.phase='{phase}' AND weekMenus.jour='{day}'")
        self.conn.execute(query)
    