//ATTRIBUTION : https://www.youtube.com/watch?v=-RCnNyD0L-s  Code based on following the following tutorial by Web Dev Simplified

const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

function initializePassport(passport,getUserByUname, getUserById){
    const authenticateUser = async (uname,password,done) => {
        const user = getUserByUname(uname)
        if (user == null){
            return done(null,false,{message: "No user found with given username"})
        }

        try {
            if(await bcrypt.compare(password,user.psw)){
                return done(null,user)
            }else{
                return done(null,false,{message: "Invalid Password"})
            }

        }catch(e){
            return done(e)

        }
    }
    passport.use(new LocalStrategy(
        {
            usernameField : 'uname',
            passwordField:'psw'
        }
         ,authenticateUser))
    passport.serializeUser((user,done) => done(null,user.id))
    passport.deserializeUser((id,done) =>{ return done(null,getUserById(id))})
}
module.exports = initializePassport
