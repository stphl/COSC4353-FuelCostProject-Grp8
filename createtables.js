const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message);
})

//turns on foreign key support for sqlite3
db.run("PRAGMA foreign_keys = ON;")

statement_usercreds = `CREATE TABLE UserCredentials
                            (id INTEGER PRIMARY KEY,
                            password  CHAR(60) NOT NULL)`
db.run(statement_usercreds);

statement_states = `CREATE TABLE states
                        (
                        state CHAR(100) PRIMARY KEY,
                        abbreviation CHAR(2) UNIQUE NOT NULL
                        );`
db.run(statement_states);
statement_client_info = `CREATE TABLE ClientInformation (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            user_id INTEGER REFERENCES UserCredentials(id),
                            username CHAR(15) NOT NULL UNIQUE,
                            fullname CHAR(100) NOT NULL,
                            address1 CHAR(100) NOT NULL,
                            address2 CHAR(100),
                            city CHAR(100) NOT NULL,
                            state_id char(100) REFERENCES states(state),
                            zipcode INTEGER NOT NULL
                            );`
db.run(statement_client_info);

statement_fuelquote = `CREATE TABLE FuelQuote
                                (quote_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                user_id INTEGER REFERENCES UserCredentials(id),
                                gallons_requested NOT NULL,
                                address CHAR(200) NOT NULL,
                                delivery_date DATE NOT NULL,
                                city CHAR(100) NOT NULL,
                                state CHAR(2) NOT NULL,
                                zipcode INTEGER NOT NULL
                                );`


db.run(statement_fuelquote);
