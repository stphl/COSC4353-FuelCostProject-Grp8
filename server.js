//ATTRIBUTION : https://www.youtube.com/watch?v=-RCnNyD0L-s  Code based on following the following tutorial by Web Dev Simplified
//Best practice even though this will never enter production
if (process.env.NODE_env !=="production"){
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

//sets up passport, which handles everything related to logins
const initializePassport = require('./passport-config')
initializePassport(
    passport,
    uname => temp_users.find(user => user.uname === uname),
    id => temp_users.find(user => user.id === id)
  )

//hardcoded variables, waiting for DBMS in assignment 4.
const temp_users = []
temp_users.push(  
    //TODO HARDCODE PROFILE and create way to put profile info in, maybe not through this list but a related one?
    {
        id: '1696572137519',
        uname: 'testing_user',
        psw: '$2b$10$wOSuTBXWn93giJEkbsvrfOlYQwn8R3dEPBWws4r7u7I8M0NY7186O' //this is 'test' but hashed
      })

var temp_users_profile = []

//allows us to use assets, namely CSS
app.use(express.static("public"));

//set ups for express and simple session stuff
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method')) //unused


app.set('view-engine','ejs')


//routes for pages
app.get('/', checkAuthenticated, (req, res) => {
    res.redirect('/profile')
})
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
app.post('/login',checkNotAuthenticated,passport.authenticate('local',
{
    failureFlash:true,
    successRedirect:'/profile',
    failureRedirect: '/login',
}))

app.get('/register',checkNotAuthenticated,(req, res) =>{
    res.render('register.ejs')
})
//handles the register form with the non DBMS system.
app.post('/register',checkNotAuthenticated,async (req,res)=>{

    try{
        //quick and dirty user generation for now.
        const hashedPw = await bcrypt.hash(req.body.psw,10)

        temp_users.push({
            id:Date.now().toString(),//uuid,
            uname:req.body.uname,
            psw:hashedPw
        })
        res.redirect('/login')

    }catch{
        res.redirect('/register')
    }
    console.log(temp_users)
})


app.get('/quote',checkAuthenticated,(req, res) =>{
    res.render('quote.ejs')
})

app.get('/history',checkAuthenticated,(req, res) =>{
    res.render('history.ejs')
})

app.get('/profile',checkAuthenticated,(req, res) =>{
    render_data = {
        error_message: req.query.error_message,
        success_message: req.query.success_message
    }
    res.render('profile.ejs', render_data)
})

app.post('/profile', checkAuthenticated,async (req,res)=>{
    var isValid = true
    var errorMessage = []

    if (req.body.fullname == null || req.body.fullname.length == 0 || req.body.fullname === undefined) {
        isValid = false
        errorMessage.push("Please enter full name")
    }
    if (req.body.fullname.length > 50) {
        isValid = false
        errorMessage.push("Full name is too long")
    }
    if (req.body.address1 == null || req.body.address1.length == 0 || req.body.address1 === undefined) {
        isValid = false
        errorMessage.push("Please enter address")
    }
    if (req.body.address1.length > 100) {
        isValid = false
        errorMessage.push("Address1 is too long")
    }
    if (req.body.address2.length > 100) {
        isValid = false
        errorMessage.push("Address2 is too long")
    }
    if (req.body.city == null || req.body.city.length == 0 || req.body.city === undefined) {
        isValid = false
        errorMessage.push("Please enter city")
    }
    if (req.body.city.length > 100) {
        isValid = false
        errorMessage.push("City name is too long")
    }
    if (req.body.state == null || req.body.state.length == 0 || req.body.state === undefined) {
        isValid = false
        errorMessage.push("Please select a state")
    }
    if (req.body.zipcode == null || req.body.zipcode.length == 0 || req.body.zipcode === undefined) {
        isValid = false
        errorMessage.push("Please enter a zipcode")
    }
    if (req.body.zipcode.lenght < 5 || req.body.zipcode.lenght > 9) {
        isValid = false
        errorMessage.push("Zipcode lenght invalid")
    }
    if (isValid === true) {
        for (let i = 0; i < temp_users.length; i++) {
            if (temp_users[i].id == req.session.passport.user) {
                temp_users[i]["fullname"] = req.body.fullname
                temp_users[i]["address1"] = req.body.address1
                temp_users[i]["address2"] = req.body.address2
                temp_users[i]["city"] = req.body.city
                temp_users[i]["zipcode"] = req.body.zipcode
            }
        }
        // Redirect to profile
        res.redirect(url.format({
            pathname: "/profile",
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
    console.log(req.session.passport.user)
    console.log(req.body)
    console.log(temp_users)
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
  

app.listen(3000)


