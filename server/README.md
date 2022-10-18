# Transfer API
A simple CRUD API with a JSON file as `database`

## Installation

```shell
npm install or npm i
```

## Usage 
The server will be hosted on http://localhost:3000/.
```shell
nodemon src/server.ts
```
- The JSON file under "data/transfer.json" will be used as database und will be updated accordingly
- There is another JSON file which you can use to restore the database
- The server will be automatically restarted if you change any of the source files


## Testing with postman
- Start the server
- Import the json file under `postman` and you will see a collection `transfer-api`
- Enjoy testing each endpoint :)
