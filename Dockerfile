FROM python:3.11.1

WORKDIR /app

RUN apt-get update && apt-get install -y locales

COPY ./back/requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

COPY ./back ./back
COPY ./.env ./.env

EXPOSE 8000

CMD ["uvicorn", "back.utils.api:app", "--host", "0.0.0.0", "--port", "8000"]
