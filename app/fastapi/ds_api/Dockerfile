FROM python:3.9

WORKDIR /usr/src/app

COPY . .

RUN python3 -m pip install .

EXPOSE 8001
CMD [ "python", "-m", "ss23_talk_a_palooza" ]
