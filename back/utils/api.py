from fastapi import FastAPI, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from json import loads, dumps

from back.src.database import Database
from back import Configuration, Menu

Configuration("back/data/aliments2_2020_sous_groupes.csv")

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

def get_current_user():
    # Stub function to get current user. Replace with actual authentication logic.
    user_id = 1
    return user_id

@app.post('/requireFood')
async def get_data():
    try:
        data = loads(Configuration().get_food_json())
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/saveMenu')
async def save_data(
    menu: str = Form(...),
    jour: str = Form(...),
    phase: str = Form(...),
    menuDetails: str = Form(...),
    intakes: str = Form(...),
    user_id: int = Depends(get_current_user)
):
    try:
        intakes = dumps(loads(intakes))
        db.addMenuToDayPhase(menu, jour, phase, menuDetails, intakes, user_id)
        return {"message": "Menu saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/requireWeekMenus')
async def require_data(user_id: int = Depends(get_current_user)):
    try:
        weekMenus, menus = db.require(user_id)
        weekMenusResp = [{"id": row[0], "jour": row[1], "phase": row[2], "menu": row[3]} for row in weekMenus]
        menusResp = [{"id": row[0], "menu": row[1], "ingredients": row[2], "quantite": row[3], "intakes": row[4]} for row in menus]
        return {'weekMenus': weekMenusResp, 'menus': menusResp}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/menu')
async def calcul_menu_intakes(items: List[Item]):
    try:
        food_dict = {}
        for item in items:
            food_dict[item.ALIMENT] = float(item.QUANTITY)
        menu = Menu(food_dict)
        return menu.intakes
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/delete_menu')
async def delete_menu(menu_name: str = Form(...), user_id: int = Depends(get_current_user)):
    try:
        db.delete_menu_from_menu_list(menu_name, user_id)
        return {"message": "Menu deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/delete_week_menu')
async def delete_week_menu(
    menu_name: str = Form(...),
    phase: str = Form(...),
    jour: str = Form(...),
    user_id: int = Depends(get_current_user)
):
    try:
        db.delete_menu_from_week_calendar(menu_name, phase, jour, user_id)
        return {"message": "Week menu deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
