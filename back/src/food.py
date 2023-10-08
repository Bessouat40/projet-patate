from back import Configuration
from back import QuasiSingleton

class Food(metaclass=QuasiSingleton) :

    def __init__(self, food_name, quantity) :
        self.food_name = food_name
        self.quantity = quantity
        self.intakes = {}
        self.intake_calcul()

    def intake_calcul(self) :
        data_aliment = Configuration().df_food[Configuration().df_food.ALIMENT == self.food_name]
        columns = data_aliment.columns[1:]
        for column in columns :
            self.intakes[column.lower()] = data_aliment[column].values[0] * self.quantity / 100
