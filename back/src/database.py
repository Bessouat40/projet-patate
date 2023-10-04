from sqlalchemy import create_engine, text
class Database() :
    
    def __init__(self):

        self.engine = create_engine("postgresql+psycopg2://postgres:postgres@foodDB:5432/foodDB")
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
    


