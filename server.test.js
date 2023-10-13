const app = require("./server.js")
const supertest = require('supertest')
//supertest(app)
const server  = supertest.agent(app)

    user =       {
        uname: 'testing_user',
        psw: '$2b$10$wOSuTBXWn93giJEkbsvrfOlYQwn8R3dEPBWws4r7u7I8M0NY7186O', //this is 'test' but hashed
      } 



testing_user = {uname:"testing_account",psw:"TestingP4SS!",psw2:"TestingP4SS!"}
duped_name = {uname:"testing_account",psw:"differentA!",psw2:"differentA!"}
nosymbol_user = {uname:"nosymbol",psw:"nosymboL3",psw2:"nosymboL3"}

broken_user = {uname:"testing_account",psw:"TestingP4SS!",psw2:"wrong"}
describe("register invalid",()=>{
    test('register invalid post',(done)=>{

        //console.log(user)
        server.post('/register').type('form')
        .send(broken_user)
        .expect(200)
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})


describe("register posts",()=>{
    test('register post',(done)=>{

        //console.log(user)
        server.post('/register').type('form')
        .send(testing_user)
        .expect(302)
        .expect("Location","/login")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})
describe("register dupe name",()=>{
    test('register dupe name post',(done)=>{

        //console.log(user)
        server.post('/register').type('form')
        .send(duped_name)
        .expect(200)
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})

describe("register no special symbol",()=>{
    test('register no special symbol post',(done)=>{

        //console.log(user)
        server.post('/register').type('form')
        .send(nosymbol_user)
        .expect(200)
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})


describe("login posts",()=>{
    test('login post',(done)=>{

        //console.log(user)
        server.post('/login').type('form')
        .send(testing_user)
        .expect(302)
        .expect("Location","/profile")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})



test_profile = {
    fullname:"John smith",
    address1:"1234 addr",
    address2:"1234 addr",
    city:"houston",
    state:"TX",
    zipcode:"77073"
}
describe("post profile",()=>{
    test('post profile',(done)=>{

        //console.log(user)
        server.post('/profile').type('form')
        .send(test_profile)
        .expect(302)
        //.expect("Location","/profile")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})

describe("get profile",()=>{
    test('get profile',(done)=>{
        //console.log(user)
        server.get('/profile')
        .expect(200)
        .end((err,res)=>{
            if (err) {console.log(err);return done(err)};
            done();
        })
    })
})



describe("get quote",()=>{
    test('get quote',(done)=>{

        //console.log(user)
        server.get('/quote')
        .expect(200)
        .end((err,res)=>{
            if (err) {console.log(err);return done(err)};
            done();
        })
    })
})

data=
{
    address: '123',
    city: '123',
    state: 'FL',
    gallons_requested: '123',
    delivery_date: '2023-11-03'
  }
  
describe("post quote",()=>{
    test('post quote',(done)=>{

        //console.log(user)
        server.post('/quote').type('form')
        .send(data)
        .expect(302)
        .expect("Location","/quote")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})

describe("get history",()=>{
    test('get history',(done)=>{

        //console.log(user)
        server.get('/history')
        .expect(200)
        .end((err,res)=>{
            if (err) {console.log(err);return done(err)};
            //console.log(res.text)
            done();
        })
    })
})