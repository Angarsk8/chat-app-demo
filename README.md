# React + ES2015 + Kemal + PostgreSQL Chat Example

![Imgur](http://i.imgur.com/1hJIcKo.gif)

Chat app using [React + ES2015](https://facebook.github.io/react/) + [Kemal](http://kemalcr.com) + [PostgreSQL](https://www.postgresql.org/)

This demonstrates how easy it is to build Realtime Web applications with Kemal.

<sup>* This project is a fork of https://github.com/f/kemal-react-chat, but implements ES2015 and integrates with a persistent data storage with PostgreSQL*<sup>

## Requirements
* Crystal 0.18.7
* PostgreSQL (I have the v9.5.2)
* Node (I have the v5.11.1)
* NPM (I have the v3.8.6)

<sup>**Node and NPM are both optional if you are just going to run the app, but necessary for development since they are needed to run the gulp tasks*<sup>

## Installation
Before you can run this program you have to install the packages that it uses. You do that with `$ shards install `.
You also need to change the path to the PostgreSQL database in `src/db/init_db.cr` and `src/app.cr`

```crystal
# src/db/init_db.cr
require "pg"

# Configure these two variables
DB_NAME = "db_name"
PG_PATH = "postgres://user:password@localhost:5432"

...
```

```crystal
# src/notes.cr
require "kemal"
require "pg"
require "./app/message"

# Configure the path of the database based on what you did in the src/db/init_db.cr file
conn = PG.connect "postgres://user:password@localhost:5432/db_name

...
```

Once you have installed the dependencies and configured the database path, you need to create the actual database and table for the application. You do that by running  `$ crystal src/db/init_db.cr`.

## Run Project
You can run this program in two ways:

1. Compile/build the project using the command line with `$ crystal build src/app.cr --release` and run the executable `$ ./app`
2. Run the program with `$ crystal src/app.cr` (no compilation required)

Once you have run the program, you can open a browser window at [localthost:3000](http://localhost:3000) and see the actual app.

## Live Demo

You can see and use a live demo of the app here: [kemal-react-pg-chat.herokuapp.com](https://kemal-react-pg-chat.herokuapp.com/).