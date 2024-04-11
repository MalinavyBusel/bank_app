# Bank Manager 

## System Requirements

- Node.js ~20.12.0
- NPM ^10.5.0
- TypeScript ~5.3.0
- Mongo ^5.0

## Installation

### Node.js

- Linux: https://nodejs.org/en/download/package-manager/
- Windows: https://nodejs.org/en/download/

### NPM 

- https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### TypeScript

- https://www.typescriptlang.org/download

### Mongo

- https://www.mongodb.com/docs/manual/installation/

1. `git clone https://github.com/MalinavyBusel/bank_app`
1. `cd bank_app`
1. `git checkout main`
1. change MONGO_URL in .env to your own
1. create apiKey for currency.getgeoapi.com and put it in .env file
1. `npm install`

## Running the server

`npm run start -- --{db_option} --{run_option}`
### db_option
| Name  | Description                                                      |
|-------|------------------------------------------------------------------|
| mongo | mongodb storage, specified in .env MONGO_URL var                 |
| json  | local directory `./db`, where documents are stored in json files |

### run_option
| Name | Description                        |
|------|------------------------------------|
| cli  | handles commands through stdio     |
| http | uses http requests to get commands |
