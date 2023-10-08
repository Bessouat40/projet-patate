# Intakes calcul from a menu

This project aims to calcul multiple intakes from a food list.
It could be usefull for some diseases that restrict the diet of the sick person.

## Usage with Docker

```bash
docker compose build && docker compose up -d
```

Now, you can access UI at `http://localhost:8000` and backend run at `http://localhost:3000`.

## Usage without Docker

- Clone this repo

- Go to `front` folder, install npm dependencies and run react frontend :

```bash
cd front
npm i -f
npm start
```

- Go outside `front` folder and run python backend :

```bash
python -m back.utils.main
```

## IHM

![ihm](ihm.png)
