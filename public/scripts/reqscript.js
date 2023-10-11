    function validatePassword(){
    let pwd = document.getElementById("psw");
    let check2 = document.getElementById("checks2");
    let check3 = document.getElementById("checks3");
    let check4 = document.getElementById("checks4");

    if(pwd.value.length >= 8)
      check4.style = "color : green;";
    else
      check4.style = "color : red;";

    if((pwd.value.indexOf("!") != -1) || (pwd.value.indexOf(".") != -1) || (pwd.value.indexOf(",") != -1) || (pwd.value.indexOf("^") != -1) || (pwd.value.indexOf("$") != -1) || (pwd.value.indexOf("#") != -1) || (pwd.value.indexOf("@") != -1))
      check2.style = "color : green;";
    else
      check2.style = "color : red;";

    const lowerC = /[a-z]/;
    const upperC = /[A-Z]/;
    if((pwd.value.match(lowerC) != null) && (pwd.value.match(upperC) != null))
      check3.style = "color : green;";
    else
      check3.style = "color : red;";
    checkmatch()
    }
  
    function checkmatch(){
    let pwd = document.getElementById("psw");
    let pwd2 = document.getElementById("psw2");
    let check1 = document.getElementById("checks1");

    if (pwd.value === pwd2.value)
      check1.style = "color : green;";
    else
      check1.style = "color : red;";
    }

    function redirectRegister(evt){
      evt.preventDefault();
      window.location.replace("/register");
    }