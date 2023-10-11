from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from json import loads
from typing import List
from pydantic import BaseModel
from ..src._generic.generic_functions import find_food

from back import Configuration
from back import Menu

from back.src.database import Database

Configuration("back/data/aliments2_2020.csv")

app = FastAPI()

db = Database()

class Item(BaseModel):
    QUANTITY: str
    id: str
    ALIMENT: str

class SaveMenu(BaseModel):
    menu: str
    jour: str
    phase: str

class Url(BaseModel):
    url: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/requireFood')
async def get_data():
    data = loads(Configuration().get_food_json())
    return data

@app.post('/saveMenu')
async def save_data(menu: str = Form(...), jour: str = Form(...), phase: str = Form(...)):
    db.addMenuToDayPhase(menu, jour, phase)

@app.post('/requireWeekMenus')
async def require_data():
    rows = db.require()
    data = [{"id": row[0], "jour": row[1], "phase": row[2], "menu": row[3]} for row in rows]
    return data

@app.post('/menu')
async def calcul_menu_intakes(items: List[Item]):
    food_dict = {}
    for item in items :
        food_dict[item.ALIMENT] = float(item.QUANTITY)
    menu = Menu(food_dict)
    return menu.intakes

# @app.post('/food')
# async def get_data(data: Url):
#     url = data.url
#     print(url)
#     async with async_playwright() as playwright:
#         foods = await find_food(playwright, url)
#     return foods