# Find Alternative To Form

This is an internal website that can be used to match alternatives for the Find Alternative To (FAT) Conceirge test.

The `alternative-ui` directory contains the frontend of the form build in react and semantic ui.

The `alternative-api` directory contains the backend build in flask linked to a sqlite database file.

## Setup

### UI

Make sure `yarn` is installed then run (in `alternative-ui`):


```bash
yarn install
```

### API

Make sure `pipenv` is installed then run (in `alternative-api`):

```bash
pipenv install
```

**OR**

Run the API using docker:

1 - Build the docker image

```bash
docker build -t alternative-api .
```

2 - Run the docker image

```bash
docker run -p 5000:5000 alternative-api
```

## Dev Run

Start the api (in `alternative-api`):

```bash
pipenv run flask run
```

Start React Development server (in `alternative-ui`):

```bash
yarn start
```

## Production

To make everything production ready you will need to build the `react-app` and transfer the build to the `template` and `static` directories of the `alternative-api`. 

I encapsulated this procedure in a `Makefile` so all you need to do to make everything build ready is to go into the `alternative-ui` folder and execute:

```bash
make build_web
```

After that (and a restart of the api) you should be able to access the build through the root of the api (on default `http://127.0.0.1:5000/`).

### Get it onto the server

Well that's what I am working on right now - so stay put this part will be updated soon (hopefully).
