//ATTRIBUTION : https://www.youtube.com/watch?v=-RCnNyD0L-s  Code based on following the following tutorial by Web Dev Simplified
//Best practice even though this will never enter production
if (process.env.NODE_env !== "production") {
    require('dotenv').config()
}
//setup the server libs
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override') //unused for now, login feature coming next
const url = require('url') // Require url object to help handling redirects passing parameters
const FuelQuoteCLass = require('./fuel-quote-class')
const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message);
})

//turns on foreign key support for sqlite3
db.run("PRAGMA foreign_keys = ON;")

//sets up passport, which handles everything related to logins
const initializePassport = require('./passport-config')
const { request } = require('http')
const { stat } = require('fs')
initializePassport(
    passport,
    uname => temp_users.find(user => user.uname === uname),
    id => temp_users.find(user => user.id === id)
)

//hardcoded variables, waiting for DBMS in assignment 4.
const temp_users = []
/*temp_users.push(
    //TODO HARDCODE PROFILE and create way to put profile info in, maybe not through this list but a related one?
    {
        id: '1696572137519',
        uname: 'testing_user',
        psw: '$2b$10$wOSuTBXWn93giJEkbsvrfOlYQwn8R3dEPBWws4r7u7I8M0NY7186O', //this is 'test' but hashed
        fuel_quotes: []
    })*/

//var temp_users_profile = []

//allows us to use assets, namely CSS
app.use(express.static("public"));

//set ups for express and simple session stuff
app.use(express.urlencoded({ extended: true }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method')) //unused

app.set('view-engine', 'ejs')


sql = `SELECT * FROM UserCredentials`

//routes for pages
app.get('/', checkAuthenticated, (req, res) => {
    res.redirect('/savedProfile')
})
db.all(sql,[],(err,rows)=>{
    if (err) console.error(err.message)
    
        rows.forEach(row => {
            if(!(temp_users.uname == row.username))
            {
                temp_users.push({
                    id:String(row.id),
                    uname:row.username,
                    psw:row.password})
            }})})

app.get('/login', checkNotAuthenticated, async (req, res) => {
    sql = `SELECT * FROM UserCredentials`
    await db.all(sql,[],(err,rows)=>{
        if (err) return console.log(err)
        rows.forEach(row => {
            if(!(temp_users.uname == row.username))
            {
                temp_users.push({
                    id:String(row.id),
                    uname:row.username,
                    psw:row.password})
            }
        })
    })
    res.render('login.ejs')
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local',
    {
        failureFlash: true,
        successRedirect: '/quote',
        failureRedirect: '/login',
    }))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.get('/logout', async (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        temp_users.pop();
        res.redirect('/login');
    });
});

const RegValidation = require('./RegValidation')

//handles the register form with the non DBMS system.
app.post('/register', checkNotAuthenticated, async (req, res) => {
    
    try {
        //quick and dirty user generation for now.
        let checkLength = RegValidation.CheckLength(req.body.psw)
        let checkSymb = RegValidation.CheckSymb(req.body.psw)
        let checkLowUp = RegValidation.CheckLowUp(req.body.psw)
        let checkmatch = RegValidation.CheckMatch(req.body.psw, req.body.psw2)
        
        /*for (i = 0; i < temp_users.length; i++)
            if (temp_users[i].username === req.body.uname)
                throw "Username already exists"*/
        unique = true
        sql = `SELECT username FROM UserCredentials;`
        await new Promise((resolve,reject)=>{ db.all(sql,[],(err,rows)=>{
            if (err) return reject(err)
            resolve(
            rows.forEach(row => {
                if(row.username == req.body.uname)
                    unique = false
            }))
        })})
        if(!unique)
            throw "Username already exists"
        if (!checkLength)
            throw "Password length too short"
        if (!checkSymb)
            throw "Password Does not contain Special Symbols"
        if (!checkLowUp)
            throw "Password Does not contain atleat 1 Upper and 1 lower Case Character"
        if (!checkmatch)
            throw "Passwords do not Match"

        try{
            const hashedPw = await bcrypt.hash(req.body.psw, 10)
            let User_insert = 'INSERT INTO UserCredentials(id,username,password) VALUES (?,?,?)';
            db.run(User_insert,[Date.now(),req.body.uname,hashedPw],(err) => {
                if(err) return console.error(err.message);
        });
        } catch (err) {
            console.log(err)
        }
        /*temp_users.push({
            id: Date.now().toString(),//uuid,
            uname: req.body.uname,
            psw: hashedPw
        })*/
        res.redirect('/login')

    } catch (err) {
        console.log(err)
        res.render('register.ejs', { error: err })
    }

    //console.log(temp_users)
})

app.get('/quote', checkAuthenticated, async (req, res) => {
    var user_data = null

    let sql = `Select * from ClientInformation`
    await new Promise((resolve,reject)=>{ db.all(sql,[],(err,rows)=>{
        if (err) return reject(err)
        resolve(
        rows.forEach(row => {
            if(req.session.passport.user == row.user_id)
                user_data = row
        }))
    })})
    /*for (let i = 0; i < temp_users.length; i++) {
        if (temp_users[i].id == req.session.passport.user) {
            user_data = temp_users[i]
        }
    }*/

    render_data = {
        user_data: user_data,
        request_data: req.session.previousInputs,
        error_message: req.session.errorMessage
    }

    if(user_data != null)
    {
        res.render('quote.ejs', render_data)
    }
    else
    {
        res.redirect('/profile')
    }

    // var previousInputs = req.session.previousInputs || {};
    // req.session.previousInputs = {};
    // res.render('quote.ejs', { request_data: previousInputs })
})


app.post('/quote',checkAuthenticated, async (req, res) =>{
    var error_message = []

    if(req.user.fuel_quotes == undefined){req.user.fuel_quotes = []}
    req.user.fuel_quotes = []
    // let address = req.body.address
    // let city = req.body.city
    // let state = req.body.state
    
    // Retrieve user information
    var user_data = null

    /*for (let i = 0; i < temp_users.length; i++) {
        if (temp_users[i].id == req.session.passport.user) {
            user_data = temp_users[i]
        }
    }*/
    let sql = `Select * from ClientInformation`
    await new Promise((resolve,reject)=>{ db.all(sql,[],(err,rows)=>{
        if (err) return reject(err)
        resolve(
        rows.forEach(row => {
            if(req.session.passport.user == row.user_id)
                user_data = row
        }))
    })})

    let address = user_data["address1"] + " " + user_data["address2"]
    let city = user_data["city"]
    let state = user_data["state"]
    let zipcode = user_data["zipcode"]
    let delivery_date = req.body.delivery_date
    let gallons_requested = Number(req.body.gallons_requested)


    const sql_q = `SELECT * FROM FuelQuote WHERE user_id = ?`
    await new Promise((resolve,reject) => {
        db.all(sql_q, [req.session.passport.user], (err, rows) => {
            if (err) return reject(err)
        resolve(
        rows.forEach(row => {
                req.user.fuel_quotes.push(row)
        }))
    })})

    
    let validiation_date = new Date(req.body.delivery_date)
    if (isNaN(validiation_date.getTime()))
    {
        error_message.push("Invalid Date")
    }

    if(isNaN(gallons_requested) || !Number.isInteger(gallons_requested) || gallons_requested < 1 || gallons_requested > 100000000)
    {
        error_message.push("Invalid number of Gallons Requested")
    }

    let request_data = {}
    if(error_message.length == 0)
    {
        let fuel_quote = new FuelQuoteCLass.FuelQuote(req.user.id, address, city, state, zipcode, gallons_requested, delivery_date)
        
        fuel_quote.calcTotalPrice(req.user.fuel_quotes)
        req.user.fuel_quotes.push(fuel_quote)
        request_data = {
            address: address,
            city: city,
            state: state,
            delivery_date: delivery_date,
            gallons_requested: gallons_requested,
            base_fuel_cost: fuel_quote.BaseFuelCost,
            service_fee: fuel_quote.service_fee,
            total_price: fuel_quote.total_price
        }

        if(req.body.button == "submit_form")
        {
            const sql = `INSERT INTO FuelQuote (quote_id, user_id, requested_date, gallons_requested, delivery_date, address, city, state, zipcode, basefuelcost, servicefee, totalprice)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`

            db.run(sql, [fuel_quote.quote_id, fuel_quote.user_id, fuel_quote.requested_date.toISOString(), fuel_quote.gallons_requested, fuel_quote.delivery_date, fuel_quote.address, fuel_quote.city, fuel_quote.state, fuel_quote.zipcode,
                fuel_quote.BaseFuelCost, fuel_quote.service_fee, fuel_quote.total_price])

        }
        error_message = ""
    }
    else
    {
        request_data = {
            address: address,
            city: city,
            state: state,
            delivery_date: delivery_date,
            gallons_requested: gallons_requested,
        }
        error_message = error_message.join(", ")
    }

    req.session.previousInputs = request_data
    req.session.errorMessage = error_message
    if(req.body.button == "submit_form")
    {
        res.redirect('/history')
    } else {
        res.redirect('/quote')
    }    
})

app.get('/history', checkAuthenticated, (req, res) => {
    const sql = `SELECT * FROM FuelQuote WHERE user_id = ?`

    new Promise((resolve,reject) => {
        db.all(sql, [req.user.id], (err, rows) => {
            if(err){
                reject(err);
            }
            else {
                resolve(rows)
            }
        })
    })
    .then(rows =>{
        let user_fuel_quotes = []
        rows.forEach((row) => {
            let fuel_quote_item = { requested_date: row.requested_date,
                                gallons_requested: row.gallons_requested,
                                address: row.address,
                                city: row.city,
                                state: row.state,
                                delivery_date: row.delivery_date,
                                BaseFuelCost: row.basefuelcost,
                                service_fee: row.servicefee,
                                total_price: row.totalprice }
            //console.log(fuel_quote_item)
            user_fuel_quotes.push(fuel_quote_item)
        })
        //console.log(user_fuel_quotes)
        res.render('history.ejs', { fuel_quotes: user_fuel_quotes })
    })
    .catch(err => {
        console.log(err.message)
        res.render('history.ejs', { fuel_quotes: [] })
    })

})

app.get('/profile', checkAuthenticated, async (req, res) => {
    let states = [];
    const sql = `SELECT * FROM states`

    new Promise((resolve,reject) => {
        db.all(sql, [], (err, rows) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(rows)
            }
        })
    })
    .then(rows =>{
        let states = []
        rows.forEach((row) => {
            let state = {   state: row.state,
                            abbreviation: row.abbreviation
                        }
            states.push(state)
        })
        render_data = {
            error_message: req.query.error_message,
            success_message: req.query.success_message,
            states: states
        }
        res.render('profile.ejs', render_data)
    })
    .catch(err => {
        console.log(err.message)
        render_data = {
            error_message: req.query.error_message,
            success_message: req.query.success_message,
            states: states
        }
        res.render('profile.ejs', render_data)
    })
})

app.post('/profile', checkAuthenticated, async (req, res) => {
    var isValid = true
    var errorMessage = []
    var profileValidator = require('./ProfileDataValidation.js')

    if (!profileValidator.CheckRequired(req.body.fullname)) {
        isValid = false
        errorMessage.push("Please enter your full name")
    }

    else if (!profileValidator.CheckMaxLength(req.body.fullname, 50)) {
        isValid = false
        errorMessage.push("Full name is too long")
    }

    if (!profileValidator.CheckRequired(req.body.address1)) {
        isValid = false
        errorMessage.push("Please enter an address")
    }

    else if (!profileValidator.CheckMaxLength(req.body.address1, 100)) {
        isValid = false
        errorMessage.push("Address1 is too long")
    }

    if (!profileValidator.CheckMaxLength(req.body.address2, 100)) {
        isValid = false
        errorMessage.push("Address2 is too long")
    }

    if (!profileValidator.CheckRequired(req.body.city)) {
        isValid = false
        errorMessage.push("Please enter a city")
    }

    else if (!profileValidator.CheckMaxLength(req.body.city, 100)) {
        isValid = false
        errorMessage.push("City name is too long")
    }

    if (!profileValidator.CheckRequired(req.body.state)) {
        isValid = false
        errorMessage.push("Please select a state")
    }

    if (!profileValidator.CheckRequired(req.body.zipcode)) {
        isValid = false
        errorMessage.push("Please enter a zipcode")
    }

    else if ((profileValidator.CheckMinLength(req.body.zipcode, 5)) || (!profileValidator.CheckMaxLength(req.body.zipcode, 9))) {
        isValid = false
        errorMessage.push("Zipcode length invalid")
    }

    let sql = "SELECT * FROM UserCredentials;";
    let local_users;

    await db.all(sql,[], async function(err,rows) {
        if (err) {
            // Redirect to profile
            res.redirect(url.format({
                pathname: "/profile",
                query: {
                    "error_message": "Error reading data from database!",
                    "success_message": ""
                }
            }))
            return console.log(err);
        }

        local_users = rows;
        //console.log(rows)
       // console.log(req.session.passport.user)
        let sql = "SELECT * FROM ClientInformation WHERE user_id = ?;"

        await db.all(sql, [req.session.passport.user], async function(err, rows) {
            if (err) {
                console.log("Error Reading ClientInformation table");
                // Redirect to profile
                res.redirect(url.format({
                    pathname: "/profile",
                    query: {
                        "error_message": "Error reading data from database!",
                        "success_message": ""
                    }
                }))
                return console.log(err);
            }

            let existing_user_info = rows;
            if (isValid === true) {
                for (let i = 0; i < local_users.length; i++) {
                    if (local_users[i].id == req.session.passport.user) {
                       // console.log("User was found!")
                        temp_users[i]["fullname"] = req.body.fullname
                        temp_users[i]["address1"] = req.body.address1
                        temp_users[i]["address2"] = req.body.address2
                        temp_users[i]["city"] = req.body.city
                        temp_users[i]["state"] = req.body.state
                        temp_users[i]["zipcode"] = req.body.zipcode
    
                        let sql = '';
                        // Save info to the database
                        if (existing_user_info.length == 0) {
                            sql = "INSERT INTO ClientInformation(user_id,fullname,address1,address2,city,state,zipcode) VALUES (?,?,?,?,?,?,?)"
                            db.run(sql, [req.session.passport.user, req.body.fullname, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zipcode],(err) => {
                                if(err) return console.error(err.message);
                            });
                        } else {
                            sql = "UPDATE ClientInformation SET fullname = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ? WHERE user_id = ?"
                            db.run(sql, [req.body.fullname, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zipcode, req.session.passport.user],(err) => {
                                if(err) return console.error(err.message);
                            });
                        }
                    }
                }
                // Redirect to profile
                res.redirect(url.format({
                    pathname: "/savedProfile",
                    query: {
                        "error_message": errorMessage.join(", "),
                        "success_message": "Information saved successfully!"
                    }
                }))
            } else {
                console.log("Entries are not valid! Form loaded again")
        
                // Redirect to profile
                res.redirect(url.format({
                    pathname: "/profile",
                    query: {
                        "error_message": errorMessage.join(", "),
                        "success_message": ""
                    }
                }))
            }
        });
    })
})

app.get('/savedProfile', checkAuthenticated, async (req, res) => {
    var user_data = null
    let sql = "SELECT * FROM ClientInformation WHERE user_id = ?;"

    await db.all(sql, [req.session.passport.user], async function(err, rows) {
        if (err) {
            console.log("Error Reading ClientInformation table");
            // Redirect to profile
            res.redirect(url.format({
                pathname: "/profile",
                query: {
                    "error_message": "Error reading data from database!",
                    "success_message": ""
                }
            }))
            return console.log(err);
        }
        if (rows.length > 0) {
            user_data = rows[0]
            render_data = {
                error_message: req.query.error_message,
                success_message: req.query.success_message,
                user_data: user_data
            }
            res.render('savedProfile.ejs', render_data)    
        } else {
            res.redirect("/profile")
        }
    });
})

//authentication functions

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}


//app.listen(3001)

module.exports = app
