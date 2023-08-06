from back import Configuration
from back import QuasiSingleton

class Food(metaclass=QuasiSingleton) :

    def __init__(self, food_name, quantity) :
        self.food_name = food_name
        self.quantity = quantity
        self.lysine = None
        self.proteines = None
        self.calories = None
        self.intake_calcul()

    def intake_calcul(self) :
        data_aliment = Configuration().df_food[Configuration().df_food.ALIMENT == self.food_name]
        self.lysine = data_aliment["LYS"].values[0] * self.quantity / 100
        self.proteines = data_aliment["PROTEINES"].values[0] * self.quantity / 100
        self.calories = data_aliment["CALORIES"].values[0] * self.quantity / 100
