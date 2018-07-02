# Installing

Run the following commands in order to pull the project dependecies
```
yarn
npm install
```

# Configuration

go to the file src/config.js and edit the fields to the desired values for your running app,
database connection credentials, aws, redis app domain and so on...

[WIP]

# Launch the server in development
```
yarn start

# to preview as production
yarn build --release
# then
yarn serve
```

# Deploying [WIP]

# Import / Export from heroku to local database

I recommend to install locally postgres or perhaps use docker with a version up to 9.6.8
then make a database backup on the heroku dashboard and download it to your machine
then in order to restore your local DB with the same look, including triggers and functions
execute the command below, dont forget to change the values for host/port/user/db, the flag -W will prompt for the password
check pg_restore help for more details

```bash
pg_restore --verbose --clean --no-acl --no-owner -h localhost -p 5432 -U postgres -d postgres -W path/to/my/heroku_database_dump_file
```


# Script to make auto generated models from salesforce schema tables

**in another folder** install the following packages:

```bash
npm i sequelize-auto
npm i pg@6.4.2 # it will trigger erros using version 7, so make sure to use this version
```

NOTE: you dont have to do this unless you need to create a new model for a new unexisting table yet.
beware that field length is missing, for instance, a varchar(18) will convert into DataTypes.STRING instead DataTypes.STRING(18)
making the model vulnerable to inserting non validated records, this might break salesforce sync.

```bash
sequelize-auto -d postgres -u postgres -p 5432 -x postgres -h localhost -e postgres -s salesforce -c ./config.json -o ./models
```


## GraphQL
We now support graphql directives @include and @skip

```graphql
// LOGIN, WORKS FOR ADMIN AND ACCOUNT/CUSTOMER
query($login: Auth!, $admin: Boolean!) {
  login(login: $login, admin: $admin) {
    __typename
    ... on AccountLogin @skip(if: $admin) {
      account {
        email
        sfid
      }
      token
    }
    ... on UserLogin @include(if: $admin) {
      user {
        email
        id
      }
      token
    }
  }
}

// Variables

{
  "login": {
    "email": "mail@moura.com",
    "password": "mail"
  },
  "admin": false
}

// response
{
  "data": {
    "login": {
      "__typename": "AccountLogin",
      "account": {
        "email": "mail@moura.com",
        "sfid": null
      },
      "token": "??"
    }
  }
}
```