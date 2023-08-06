from back import Food

class Menu:

    def __init__(self, food_dict) :
        Food._instances.clear()
        self.food_dict = food_dict
        self.create_food_objects()
        self.intakes = {"proteines":0, "lysine":0, "calories":0}
        self.fill_df_intakes()
    
    def update_intakes(self, food) :
        for intake in self.intakes.keys() :
            self.intakes[intake] += getattr(food, intake)

    def create_food_objects(self):
        for food in list(self.food_dict.keys()) :
            Food(food, self.food_dict[food])

    def fill_df_intakes(self) :
        for food in list(Food._instances.items()) :
            self.update_intakes(food[1])
        
    