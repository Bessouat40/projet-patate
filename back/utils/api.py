from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from json import loads
from typing import List
from pydantic import BaseModel
from ..src._generic.generic_functions import find_food
from back import Configuration
from back import Menu
from json import loads, dumps
from ..src.auth import create_access_token
from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import FastAPI, Depends, HTTPException, status, Form

from back.src.database import Database

Configuration("back/data/aliments2_2020_sous_groupes.csv")
ACCESS_TOKEN_EXPIRE_MINUTES = 30

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
    menuDetails: str
    intakes: str

class MenuName(BaseModel):
    menu_name: str

class Url(BaseModel):
    url: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register")
def register_user(username: str = Form(...), password: str = Form(...)):
    # vérifier si user existe déjà
    row = db.get_user_by_username(username)
    if row:
        raise HTTPException(status_code=400, detail="Username already taken")
    # hasher le mot de passe et insérer
    hashed_pw = db.get_password_hash(password)
    db.create_user(username, hashed_pw)
    return {"message": "User created successfully"}

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # form_data.username, form_data.password
    user = db.get_user_by_username(form_data.username)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    user_id, db_username, db_hashed = user
    if not db.verify_password(form_data.password, db_hashed):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Générer un token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_username, "user_id": user_id},
        expires_delta=access_token_expires
    )
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@app.post('/requireFood')
async def get_data():
    data = loads(Configuration().get_food_json())
    return data

@app.post('/saveMenu')
async def save_data(menu: str = Form(...), jour: str = Form(...), phase: str = Form(...), menuDetails: str = Form(...), intakes: str = Form(...)):
    intakes = dumps(loads(intakes))
    db.addMenuToDayPhase(menu, jour, phase, menuDetails, intakes)

@app.post('/requireWeekMenus')
async def require_data():
    weekMenus, menus = db.require()
    weekMenusResp = [{"id": row[0], "jour": row[1], "phase": row[2], "menu": row[3]} for row in weekMenus]
    menusResp = [{"id": row[0], "menu": row[1], "ingredients": row[2], "quantite": row[3], "intakes": row[4]} for row in menus]
    return {'weekMenus' : weekMenusResp, 'menus' : menusResp}

@app.post('/menu')
async def calcul_menu_intakes(items: List[Item]):
    food_dict = {}
    for item in items :
        food_dict[item.ALIMENT] = float(item.QUANTITY)
    menu = Menu(food_dict)
    return menu.intakes

@app.post('/delete_menu')
async def delete_menu(menu_name: str = Form(...)):
    db.delete_menu_from_menu_list(menu_name)

@app.post('/delete_week_menu')
async def delete_menu(menu_name: str = Form(...), phase: str = Form(...), jour: str = Form(...)):
    db.delete_menu_from_week_calendar(menu_name, phase, jour)

# @app.post('/food')
# async def get_data(data: Url):
#     url = data.url
#     print(url)
#     async with async_playwright() as playwright:
#         foods = await find_food(playwright, url)
#     return foods