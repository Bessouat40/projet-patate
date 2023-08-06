from back import Singleton
from pandas import read_csv

class Configuration(metaclass=Singleton):

    def __init__(self, path) :
        self.df_food = read_csv(path)


    def get_food_json(self) :
        if "QUANTITY" not in self.df_food.columns :
            self.df_food["QUANTITY"] = [0 for i in range(len(self.df_food))]
        if "id" not in self.df_food.columns :
            self.df_food["id"] = [i for i in range(len(self.df_food))]
        return self.df_food[["ALIMENT", "QUANTITY", "id"]].to_json(orient="records")