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
    res.render('profile.ejs')
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


