const app = require("./server.js")
const supertest = require('supertest')
//supertest(app)
const server  = supertest.agent(app)
/*
 describe(
    'Tests for server functions',() =>{

        test("Testing get user by id with dummy user - Truthy",()=>{
            expect(getUserById('1696572137519')).toBeTruthy()
        })
        test("Testing get user by id with dummy user - Falsy",()=>{
            expect(getUserById('not an ID!')).toBeFalsy()
        })

        test("Testing get user by name with dummy user - Truthy",()=>{
            expect(getUserByUname('testing_user')).toBeTruthy()
        })
        test("Testing get user by name with dummy user - Falsy",()=>{
            expect(getUserByUname('not a user!')).toBeFalsy()
        })

        test("GET /login should work with a non authed user ",async ()=>{
            
            const res = await supertest(app).get('/login').expect(200)
        })
        test("GET /register should work with a non authed user ",async ()=>{
            
            const res = await supertest(app).get('/register').expect(200)
        })

        test("GET /quote should redirect with a non authed user ",async ()=>{
            
            const res = await supertest(app).get('/quote').expect(302)
        })
        test("GET /profile should redirect with a non authed user ",async ()=>{
            
            const res = await supertest(app).get('/profile').expect(302)
        })
        test("GET /history should redirect with a non authed user ",async ()=>{
            
            const res = await supertest(app).get('/history').expect(302)
        })
    })
*/
    user =       {
        uname: 'testing_user',
        psw: '$2b$10$wOSuTBXWn93giJEkbsvrfOlYQwn8R3dEPBWws4r7u7I8M0NY7186O', //this is 'test' but hashed
      } 

/* describe("Login posts",()=>{
    test('login post',(done)=>{

        console.log(user)
        server.post('/login')
        .type('form')
        .send(user)
        .expect(302)
        .expect("Location","/profile")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
}) */

testing_user = {uname:"testing_account",psw:"TestingP4SS!",psw2:"TestingP4SS!"}
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