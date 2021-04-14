FROM python:3.8-slim

WORKDIR /alternative-form/

RUN pip install pipenv

COPY Pipfile* ./
RUN pipenv install

COPY . ./
COPY ./templates ./
COPY ./static ./

EXPOSE 4000

CMD ["pipenv", "run", "gunicorn", "-b", "0.0.0.0:4000", "app:app"]