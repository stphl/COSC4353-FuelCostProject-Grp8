const app = require("./server.js")
const supertest = require('supertest')
//supertest(app)
const server  = supertest.agent(app)
const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message);
})
    user ={
        uname: 'testing_user',
        psw: '$2b$10$wOSuTBXWn93giJEkbsvrfOlYQwn8R3dEPBWws4r7u7I8M0NY7186O', //this is 'test' but hashed
      } 


      describe("Non authed gets",()=>{
        test('get profile',(done)=>{
            //console.log(user)
            server.get('/profile')
            .expect(302)
            .expect("Location","/login")
            .end((err,res)=>{
                if (err) {console.log(err);return done(err)};
                done();
            })
        })
        test('get saved profile',(done)=>{
            //console.log(user)
            server.get('/savedProfile')
            .expect(302)
            .expect("Location","/login")
            .end((err,res)=>{
                if (err) {console.log(err);return done(err)};
                done();
            })
        })
        test('get history',(done)=>{
            //console.log(user)
            server.get('/history')
            .expect(302)
            .expect("Location","/login")
            .end((err,res)=>{
                if (err) {console.log(err);return done(err)};
                done();
            })
        })
        test('get quote',(done)=>{
            //console.log(user)
            server.get('/quote')
            .expect(302)
            .expect("Location","/login")
            .end((err,res)=>{
                if (err) {console.log(err);return done(err)};
                done();
            })
        })
    })


testing_user = {uname:"testing_account",psw:"TestingP4SS!",psw2:"TestingP4SS!"}
existing_user = {uname:"existingtest",psw:"ExistingTest!1"}
duped_name = {uname:"testing_account",psw:"differentA!",psw2:"differentA!"}
nosymbol_user = {uname:"nosymbol",psw:"nosymboL3",psw2:"nosymboL3"}

broken_user = {uname:"broken_accnt",psw:"TestingP4SS!",psw2:"wrong"}
shortps_user = {uname:"small_passwd",psw:"s",psw2:"wrong"}
noupper_user = {uname:"no_upper",psw:"a@345678",psw2:"a@345678"}
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
describe("noupper_user invalid",()=>{
    test('noupper_user post',(done)=>{

        //console.log(user)
        server.post('/register').type('form')
        .send(noupper_user)
        .expect(200)
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})
describe("small password register",()=>{
    test('register small password',(done)=>{

        //console.log(user)
        server.post('/register').type('form')
        .send(shortps_user)
        .expect(200)
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})

describe("register posts",()=>{
    test('register post',(done)=>{
        db.run("DELETE FROM UserCredentials WHERE username = \"testing_account\";")
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
        .send(existing_user)
        .expect(302)
        .expect("Location","/profile")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})


test('get register after login',(done)=>{
    //console.log(user)
    server.get('/register')
    .expect(302)
    .expect("Location","/")
    .end((err,res)=>{
        if (err) {console.log(err);return done(err)};
        done();
    })
})

test('get login after login',(done)=>{
    //console.log(user)
    server.get('/login')
    .expect(302)
    .expect("Location","/")
    .end((err,res)=>{
        if (err) {console.log(err);return done(err)};
        done();
    })
})




test_profile = {
    fullname:"John Smith",
    address1:"123 Example Ln",
    address2:"123 Example Ln",
    city:"houston",
    state:"TX",
    zipcode:"77073"
}

long_profile = {
    fullname:"a VERY VERY VERY VERY VERY VERY VERYVERYVERYVERYVERY long name",
    address1:"1234 addr",
    address2:"1234 addr",
    city:"houston",
    state:"TX",
    zipcode:"77073"
}
empty_name = {
    address1:"1234 addr",
    address2:"1234 addr",
    city:"houston",
    state:"TX",
    zipcode:"77073"
}


empty_addr = {
    fullname:"shortname",
    address2:"1234 addr",
    city:"houston",
    state:"TX",
    zipcode:"77073"
}

long_addr = {
    fullname:"shortname",
    address1:"the longest known address in the united states the longest known address in the united states the longest known address in the united states the longest known address in the united states",
    address2:"1234 addr",
    city:"houston",
    state:"TX",
    zipcode:"77073"
}

long_addr2 = {
    fullname:"shortname",
    address1:"the longest known address in the united states",
    address2:"the longest known second address in the united states the longest known address in the united states the longest known address in the united states the longest known address in the united states",
    city:"houston",
    state:"TX",
    zipcode:"77073"
}

describe("empty name",()=>{
    test('empty name profile',(done)=>{

        //console.log(user)
        server.post('/profile').type('form')
        .send(empty_name)
        .expect(302)
        //.expect("Location","/profile")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})

describe("no addr",()=>{
    test('no addr profile',(done)=>{

        //console.log(user)
        server.post('/profile').type('form')
        .send(empty_addr)
        .expect(302)
        //.expect("Location","/profile")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})

describe("long addr",()=>{
    test('long addr profile',(done)=>{

        //console.log(user)
        server.post('/profile').type('form')
        .send(long_addr)
        .expect(302)
        //.expect("Location","/profile")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})

describe("long addr2 ",()=>{
    test('long addr2 profile',(done)=>{

        //console.log(user)
        server.post('/profile').type('form')
        .send(long_addr2)
        .expect(302)
        //.expect("Location","/profile")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})


no_city = {
    fullname:"John smith",
    address1:"1234 addr",
    address2:"1234 addr",
    state:"TX",
    zipcode:"77073"
}

describe("no_city ",()=>{
    test('no_city profile',(done)=>{

        //console.log(user)
        server.post('/profile').type('form')
        .send(no_city)
        .expect(302)
        //.expect("Location","/profile")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})


long_city = {
    fullname:"John smith",
    address1:"1234 addr",
    address2:"1234 addr",
    city:"houston houston houston houston houston houston",
    state:"TX",
    zipcode:"77073"
}


describe("long_city ",()=>{
    test('long_city profile',(done)=>{

        //console.log(user)
        server.post('/profile').type('form')
        .send(long_city)
        .expect(302)
        //.expect("Location","/profile")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})


no_state = {
    fullname:"John smith",
    address1:"1234 addr",
    address2:"1234 addr",
    city:"houston houston houston houston houston houston",
    zipcode:"77073"
}


describe("no_state ",()=>{
    test('no_state profile',(done)=>{

        //console.log(user)
        server.post('/profile').type('form')
        .send(no_state)
        .expect(302)
        //.expect("Location","/profile")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})


no_zip = {
    fullname:"John smith",
    address1:"1234 addr",
    address2:"1234 addr",
    city:"houston",
    state:"TX",
}

describe("no_zip ",()=>{
    test('no_zip profile',(done)=>{

        //console.log(user)
        server.post('/profile').type('form')
        .send(no_zip)
        .expect(302)
        //.expect("Location","/profile")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})

short_zip = {
    fullname:"John smith",
    address1:"1234 addr",
    address2:"1234 addr",
    city:"houston",
    state:"TX",
    zipcode:"1"
}

describe("short_zip ",()=>{
    test('short_zip profile',(done)=>{

        //console.log(user)
        server.post('/profile').type('form')
        .send(short_zip)
        .expect(302)
        //.expect("Location","/profile")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})

describe("name too long profile",()=>{
    test('too long profile',(done)=>{

        //console.log(user)
        server.post('/profile').type('form')
        .send(long_profile)
        .expect(302)
        //.expect("Location","/profile")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
})

describe("post profile",()=>{
    test('post profile',(done)=>{
        //db.run("DELETE FROM ClientInformation WHERE fullname = \"John smith\";")
        //console.log(user)
        server.post('/profile').type('form')
        .send(test_profile)
        .expect(302)
        .expect("Location","/savedProfile?error_message=&success_message=Information%20saved%20successfully!")
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

describe("get saved profile after login",()=>{
    test('get saved profile after login',(done)=>{
        //console.log(user)
        server.get('/savedProfile')
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

    address1: '123',
    address2: "234",
    city: '123',
    state: 'Florida',
    gallons_requested: '123',
    delivery_date: '2023-11-03'
  }
  
  nandata=
{

    address1: '123',
    address2: "234",
    city: '123',
    state: 'Florida',
    gallons_requested: -1,
    delivery_date: '0'
  }
  nandata2=
  {
  
      address1: '123',
      address2: "234",
      city: '123',
      state: 'Florida',
      gallons_requested: 50,
      delivery_date: '0'
    }
    describe("bad delivery requested",()=>{
        test('post quote',(done)=>{
    
            //console.log(user)
            server.post('/quote').type('form')
            .send(nandata2)
            .expect(302)
            .expect("Location","/quote")
            .end((err,res)=>{
                if (err) return done(err);
                done();
            })
        })
    }) 
  describe("Nan gals requested",()=>{
    test('post quote',(done)=>{

        //console.log(user)
        server.post('/quote').type('form')
        .send(nandata)
        .expect(302)
        .expect("Location","/quote")
        .end((err,res)=>{
            if (err) return done(err);
            done();
        })
    })
}) 
  
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

