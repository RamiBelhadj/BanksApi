# BanksApiCodingChallenge

this solution provided using Angular 14, Ngrx for the store management, Jasmine for the unit testing 
and bootstrap for the style

# Setting Up a Project
### FrontEnd Part

Install the Angular CLI globally:

```
npm install -g @angular/cli
```

Install all the dependecies: 
```sh
cd Web
npm install 
```

Runs the app in development mode.
```
npm start
```

### BackEnd Part

Install all the dependecies: 
```sh
cd server
npm install 
```

Runs the server.
```
npm start
```
        

# the structure of the page 

the overall structure is navbar at the top of the page so we can always go to the home page and the container changes based on the route

the home page is a table consisting the transaction with a formatted input and button functionalities buttons
the add page is a form in which you can add a new transaction 
the edit page also similar to the add page with an autocomplete of its corresponding data (if we want to edit a non valid id it returns to the home page)

## data format 
we use NgbDateParserFormatter for the date format and the angular Iban for the iban format event for validation

## Filter and sort 
as mentioned in the coding challenge a possibility for a filter and sort operation can take place 
so instead of searching a name you can simply type it and for searching the highest(or lowest) and the latest (earliest) transaction you can easily click on the amount or date column and it will be automatically sorted

# NgRx

the main building for an NgRx store are: 
- actions : represents the event trigger to the reducers to save data 
- reducers: used to create a new state on data change 
- store: model that holds the data 
- selectors: selector to fetch the data from angular components 
- effects: deals with the API service (server side) triggered by the actions.

I create a shared appstate so you can update the apiStatus like success or failed and the message response 

# Unit test 
the test was implemented for the service part (CRUD) and the form validation in AddComponents 
