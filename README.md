# Intakes calcul from a menu

This project aims to calcul multiple intakes from a food list.
It could be usefull for some diseases that restrict the diet of the sick person.

## Usage with Docker

- First create `.env` file :

```bash
mv .env.example .env
```

- Now you can fill your `.env` file with your postgres database values.

`Example :`

```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=foodDB
HOST=foodDB
PORT=5432
```

- Run docker :

```bash
./run.sh
```

Now, you can access `Foodcop` at `http://localhost`.

## USAGE WITH BASH CMD

```bash
make test
```

Then you can check app state :

```bash
docker-compose logs -f
```

-------------------------------- Working on this feature --------------------------------

## Keycloak

For access Keycloak console admin, go to : `http://localhost:8080/admin/master/console/`.

- Create your realm
- Create your Client :
  - Setup your client Valid redirect URIs to `http://localhost/*`
  - Setup your Web origins to `http://localhost`
