from back import Configuration
from back import QuasiSingleton

class Food(metaclass=QuasiSingleton) :

    def __init__(self, food_name, quantity) :
        self.food_name = food_name
        self.quantity = quantity
        self.intake_calcul()

    def intake_calcul(self) :
        data_aliment = Configuration().df_food[Configuration().df_food.ALIMENT == self.food_name]
        self.proteines = data_aliment["PROTEINES"].values[0] * self.quantity / 100
        self.glucides = data_aliment["GLUCIDES"].values[0] * self.quantity / 100
        self.calories = data_aliment["ENERGIE"].values[0] * self.quantity / 100
        self.lipides = data_aliment["LIPIDES"].values[0] * self.quantity / 100
        self.fructose = data_aliment["FRUCTOSE"].values[0] * self.quantity / 100
        self.sucres = data_aliment["SUCRES"].values[0] * self.quantity / 100
        self.galactose = data_aliment["GALACTOSE"].values[0] * self.quantity / 100
        self.glucose = data_aliment["GLUCOSE"].values[0] * self.quantity / 100
        self.lactose = data_aliment["LACTOSE"].values[0] * self.quantity / 100
        self.maltose = data_aliment["MALTOSE"].values[0] * self.quantity / 100
        self.saccharose = data_aliment["SACCHAROSE"].values[0] * self.quantity / 100
        self.amidon = data_aliment["AMIDON"].values[0] * self.quantity / 100
