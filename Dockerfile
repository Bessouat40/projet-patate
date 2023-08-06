FROM ubuntu:bionic

RUN apt-get update
RUN apt-get install curl -y
RUN apt-get install python3 python3-pip -y
RUN pip3 install --upgrade pip

WORKDIR /

COPY ./back /back
RUN pip3 install -r back/requirements.txt

CMD python3 -m back.utils.main