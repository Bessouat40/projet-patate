from fastapi import FastAPI, Depends, HTTPException, status, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List
from json import loads, dumps
from jose import jwt, JWTError
import requests
from sqlalchemy import create_engine, text

from back.src.database import Database
from back import Configuration, Menu

Configuration("back/data/aliments2_2020_sous_groupes.csv")

app = FastAPI()

db = Database()

security = HTTPBearer()

jwks = None

def get_jwks():
    global jwks
    if jwks is None:
        url = "http://keycloak:8080/realms/foodcop-realm/.well-known/openid-configuration"
        print('url : ', url)
        response = requests.get(url)
        if response.status_code != 200:
            raise Exception("Impossible de récupérer la configuration OpenID")
        config = response.json()
        jwks_uri = config["jwks_uri"]
        response = requests.get(jwks_uri)
        if response.status_code != 200:
            raise Exception("Impossible de récupérer les JWKS")
        jwks = response.json()
    return jwks

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        unverified_header = jwt.get_unverified_header(token)
        print("Unverified Header:", unverified_header)
        kid = unverified_header['kid']
        jwks = get_jwks()
        key = next((k for k in jwks['keys'] if k['kid'] == kid), None)
        if key is None:
            raise HTTPException(status_code=401, detail="Clé publique non trouvée")
        print('token : ', token)
        print('key : ', key)
        print('jwks : ', jwks)
        payload = jwt.decode(
            token,
            key,
            algorithms=['RS256'],
            audience='account',
            issuer='http://51.20.69.171/:8080/realms/foodcop-realm'
        )
        print("Decoded Payload:", payload)

        user_id = payload.get('sub')
        username = payload.get('preferred_username')
        if user_id is None or username is None:
            raise HTTPException(status_code=401, detail="Informations utilisateur manquantes dans le jeton")
        with db.engine.connect() as conn:
            result = conn.execute(text("SELECT * FROM users WHERE id = :user_id"), {'user_id': user_id})
            user = result.fetchone()
            if user is None:
                db.add_new_user_and_initialize_week_menus(user_id, username)
        return user_id
    except JWTError as e:
        raise HTTPException(status_code=401, detail="Jeton invalide")


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
    user_id: str = Depends(get_current_user)
):
    # try:
    intakes = dumps(loads(intakes))
    db.addMenuToDayPhase(menu, jour, phase, menuDetails, intakes, user_id)
    return {"message": "Menu saved successfully"}
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=str(e))

@app.post('/requireWeekMenus')
async def require_data(user_id: str = Depends(get_current_user)):
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
async def delete_menu(menu_name: str = Form(...), user_id: str = Depends(get_current_user)):
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
    user_id: str = Depends(get_current_user)
):
    try:
        db.delete_menu_from_week_calendar(menu_name, phase, jour, user_id)
        return {"message": "Week menu deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
