const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message);
})

//turns on foreign key support for sqlite3
db.run("PRAGMA foreign_keys = ON;")

//db.run("DROP TABLE UserCredentials");
//db.run("DROP TABLE ClientInformation");
//db.run("DROP TABLE FuelQuote");


statement_usercreds = `CREATE TABLE UserCredentials
                            (id INTEGER PRIMARY KEY,
                            username Char(15) NOT NULL UNIQUE,
                            password  CHAR(60) NOT NULL)`;
//db.run(statement_usercreds);

statement_states = `CREATE TABLE states
                        (
                        state CHAR(100) PRIMARY KEY,
                        abbreviation CHAR(2) UNIQUE NOT NULL
                        );`
//db.run(statement_states);
statement_client_info = `CREATE TABLE ClientInformation (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            user_id INTEGER REFERENCES UserCredentials(id),
                            fullname CHAR(100) NOT NULL,
                            address1 CHAR(100) NOT NULL,
                            address2 CHAR(100),
                            city CHAR(100) NOT NULL,
                            state_id char(100) REFERENCES states(state),
                            zipcode INTEGER NOT NULL
                            )`;
//db.run(statement_client_info);

statement_fuelquote = `CREATE TABLE FuelQuote
                                (quote_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                user_id INTEGER REFERENCES UserCredentials(id),
                                requested_date TIMESTAMP NOT NULL,
                                gallons_requested INTEGER NOT NULL,
                                delivery_date DATE NOT NULL,
                                address CHAR(200) NOT NULL,
                                city CHAR(100) NOT NULL,
                                state CHAR(2) NOT NULL,
                                zipcode INTEGER NOT NULL,
                                basefuelcost DECIMAL(10,2) NOT NULL,
                                servicefee DECIMAL (10,2) NOT NULL,
                                totalprice DECIMAL (10,2) NOT NULL
                                );`


//db.run(statement_fuelquote);


const hashedPw = '1qaz2wsx'
const user_id = Date.now().toString()
const uname = 'blaze'
User_insert = 'INSERT INTO UserCredentials(id,username,password) VALUES (?,?,?)';
db.run(User_insert,[1696572137519,'testing_user','wOSuTBXWn93giJEkbsvrfOlYQwn8R3dEPBWws4r7u7I8M0NY7186O'],(err) => {
    if(err) return console.error(err.message);
});