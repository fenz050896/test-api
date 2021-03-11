# Test API
## Usage
Create .env file in root project
then fill the credential below

```
DB_HOST=<fill>
DB_USER=<fill>
DB_PASS=<fill>
DB_NAME=<fill>
DB_PORT=<fill>
DB_DIALECT=<fill>
```

Create your database, then run migration in terminal or cmd:

```
cd your/folder/to/project
yarn seq:migrate
or
npm run seq:migrate
```

Undo the migration
```
yarn seq:migrate:undo
or
npm run seq:migrate:undo

```

To start the server
```
yarn start
or
npm run start
```

To unit test
```
yarn test
or
npm run test
```

## Documentation
After running the server, locate to [https://localhost:3478/docs](#)