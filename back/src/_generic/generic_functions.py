import re

async def find_food(playwright, url):
    webkit = playwright.webkit
    browser = await webkit.launch()
    context = await browser.new_context()
    page = await context.new_page()
    # await page.goto("https://www.marmiton.org/recettes/recette_brochettes-poulet-chorizo_309587.aspx")
    await page.goto(url)
    try :
        await page.get_by_text("J'accepte tout").click()
    except : 
        print("problem...")
    ingredients = await page.query_selector_all("div.RCP__sc-vgpd2s-1.fLWRho")
    ingredients_list = await find_ingredients(ingredients)
    await browser.close()
    return ingredients_list

async def find_ingredients(ingredients) :
    ingredients_list = []
    for ingredient in ingredients :
        append_ingredient = await ingredient.text_content()
        print(append_ingredient)
        ingredients_list.append(append_ingredient)
    return ingredients_list