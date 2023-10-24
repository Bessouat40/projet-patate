from back import Food
from back import Configuration

class Menu:

    def __init__(self, food_dict) :
        Food._instances.clear()
        self.food_dict = food_dict
        self.create_food_objects()
        self.intakes = {}
        self.intakesNames = Configuration().df_food.columns[1:].values
        for intake in self.intakesNames :
            if intake.lower() != 'id' and intake.lower() != "quantity" :
                self.intakes[intake.lower()] = 0
        self.fill_df_intakes()
    
    def update_intakes(self, food) :
        for intake in self.intakesNames :
            if intake.lower() != 'id' and intake.lower() != "quantity" :
                value = intake.lower()
                self.intakes[value] += food.intakes[value]
                self.intakes[value] = round(self.intakes[value], 3)

    def create_food_objects(self):
        for food in list(self.food_dict.keys()) :
            Food(food, self.food_dict[food])

    def fill_df_intakes(self) :
        for food in list(Food._instances.items()) :
            self.update_intakes(food[1])
        
    