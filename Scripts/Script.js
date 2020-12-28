
    var userData = {
        users: []
    };


function onRegister() {
    
    var username;
    var userPassword;
    var userPassConfrim;


    //getting fields for verification proccess.
    username = document.getElementById("userNameFeild").value;
    userPassword = document.getElementById("userPasswordFeild").value;
    userPassConfrim = document.getElementById("userPasswordConfirmFeild").value;

    //Checking the password and confirmation are typical.
    if (username != "" || userPassword != "" || userPassConfrim != "") {
        if (userPassword === userPassConfrim) {
            if(userData.users.length == 0){
                console.log("first user registered");
                userData.users.push({
                    name: username,
                    password: userPassword
                });
            }else{
                //add username and password to the json file.
                console.log("They match correctly");
                userData = JSON.parse(C.getCookie("userData"))
                userData.users.push({
                    name: username,
                    password: userPassword
                });
            }


            console.log(userData);
            var dataToAppend = JSON.stringify(userData);
            //localStorage.setItem("serverData", dataToAppend);
            C.addCookie("userData",dataToAppend,10);

            // xhr.open("Post", "userData.json");
            //xhr.send(dataToAppend);



        } else {
            alert("Password and Confirmation do not match");
        }

    } else {
        alert("you must add the data below before pressing the register button !");
    }


    //append the data to the json file.

    //var fs = require("fs");
    //fs.writeFileSync("userData.json", dataToAppend);
    // xhr.open("PUT", "userData.json",true);
    // xhr.send(dataToAppend);

    location.assign("LoginForm.html");

}








function onLogin() {
    debugger;
    //getting fields for verification proccess.
    var userName = document.getElementById("userNameFeild").value;
    var userPassword = document.getElementById("userPasswordFeild").value;

    //getting the data from saved Cookie.
    userData = JSON.parse(C.getCookie("userData"));

    console.log(userData);


    //Checking the data from saved Cookie
    for(var i = 0; i < userData.users.length; i++){
        if(userData.users[i].name == userName && userData.users[i].password == userPassword){
            C.addCookie("User Name", userName);
            console.log("userName" + userName);
            location.assign("Home.html")
        }else{
            alert("invalid user name or password");
        }
    }

    //adding the user cookie to start playing .

}


function onLogout(){
    var userCookie = C.getCookie("User Name");
    console.log(userCookie);
    if(userCookie != null || userCookie != ""){
        C.deleteThisCookie("User Name");
        location.reload();
    }
    
}



function userOnFocus(){
    userNameFeild = document.getElementById("userNameFeild");
    userNameFeild.style.width = "280px";
    userNameFeild.style["border-color"] = "#2ecc71";
}

function userOnBlur(){
    userNameFeild = document.getElementById("userNameFeild");
    userNameFeild.style.width = "200px";
    userNameFeild.style["border-color"] = "#3498db";
}


function passwordOnFocus(){
    passwordFeild = document.getElementById("userPasswordFeild");
    passwordFeild.style.width = "280px";
    passwordFeild.style["border-color"] = "#2ecc71";
}

function passwordOnBlur(){
    passwordFeild = document.getElementById("userPasswordFeild");
    passwordFeild.style.width = "200px";
    passwordFeild.style["border-color"] = "#3498db";
}


function passwordConfOnFocus(){
    userNameFeild = document.getElementById("userPasswordConfirmFeild");
    userNameFeild.style.width = "280px";
    userNameFeild.style["border-color"] = "#2ecc71";
}

function passwordConfOnBlur(){
    passwordConfermationFeild = document.getElementById("userPasswordConfirmFeild");
    passwordConfermationFeild.style.width = "200px";
    passwordConfermationFeild.style["border-color"] = "#3498db";
}