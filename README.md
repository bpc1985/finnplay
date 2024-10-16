# Finnplay App

An application that allows users to filter games by multiple criteria. The application consists of a server and a client parts. The server implements an API to communicate with the client (authenticate users, transfer data, ...).It is built using Vite, React, TypeScript and SCSS. In addition, NodeJS and ExpressJS are used to build simple API

## Project Screen Shot(s)

![Desktop App](https://i.imgur.com/NLiHSVw.png)

![Mobile App](https://i.imgur.com/HfgHYqD.png)

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Add local file .env in client folder and set API URL same as this example

```
VITE_APP_BASE_URL=http://localhost:3001
```

Add aslo local file .env in server folder and set these variables

```
PORT=3001
SECRET_KEY=your-secret-key-here
```

Installation in each folder client and server:

`npm install`

To start local dev server for both frontend app and API server:

`npm run dev`

To visit frontend app in localhost:

`http://localhost:3000`

To visit server app in localhost:

`http://localhost:3001`

To bundle or build Frontend project for deployment:

`npm run build`
