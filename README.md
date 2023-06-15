# Metro-mars
🚇 Metro App web application built for my EBC-WA - Web Applications Development course. Metro stations and timetables are made manually to simulate.

## What I Learned
- Implemented backend using the Express.js framework
- Implemented frontend using the Vue.js  with Vuetify 3
- Connected database to store and query data using MongoDB
- Designed dynamic web based on different roles and provided authentication process with proper security 

## How to run this project on your local machine?
Initial environment:
```
$ npm init 
```
Install required librabries:
```
$ npm install 
```
Start:
```
$ node index.js
```

## Repo Structure
```
/
├─ constrollers/         # User conrolles class, Station controller class, ticket controller class, train controller class, role controller class 
├─ models/               # Role scheme, station scheme, ticket scheme, train scheme, user scheme 
├─ utils/                # Control authorization and role required
├─ validations/          # Validations for forms on server side.
├─ vue-app/              # Frontend side
|     ├─ vue-project/ 
|            ├─ public/
│                ├─ src/
|                |    ├─ assets/ 
|                |    ├─ code/           # Axios implementation  
│                |    ├─ components/     # AppBar and LoggedUser components
│                |    ├─ model/          # Interfaces for Station, Ticket, Train, User
│                |    ├─ plugins/
|                |    ├─ router/
|                |          ├─ pages/    # Main components
|                |          ├─ index.ts  # Implementations vue-router with routes
|                |    ├─ stores/         # Stores by pinia for user, station , ticket, train
|                |    ├─ styles/
|                |            ├─ App.vue        
│                |            ├─ config.ts
|                |            ├─ main.ts
|                |
|                ├─ index.html
|                ├─ package.json          # Required librabries
|
|
├─ index.js           # Routes    
├─ README.md          # This file
└─ package.json       # Required librabries
```

## <p align="center">Screenshot Homepage</p>
<p align="center"><img src="https://github.com/bogdanvyzhlov/metro-mars/blob/master/uploads/metro.png" alt="ER" width="600"/></p>

## <p align="center">Use case diagram</p>
<p align="center"><img src="https://github.com/bogdanvyzhlov/metro-mars/blob/master/uploads/use_case.jpg" alt="ER" width="600"/></p>
