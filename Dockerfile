FROM python:3.11.1

WORKDIR /

RUN apt-get update && apt-get install -y locales
# RUN apt-get update && apt-get install -y sqlite3 --no-install-recommends libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 libnss3 libdrm-common libgbm1 libxshmfence1
COPY ./back/requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

COPY ./back /back

# RUN python3 -m playwright install

CMD python3 -m back.utils.main