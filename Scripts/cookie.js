function addCookie(cookieName, cookieValue, expirFlag) {
    if (expirFlag) {
        today = new Date();
        today.setMonth(today.getMonth() + expirFlag);
        document.cookie = cookieName + "=" + cookieValue + ";expires=" + today.toUTCString();
    } else {
        document.cookie = cookieName + "=" + cookieValue;
    }
}


function deleteCookies() {
    document.cookie ="";
    for (var i = 0; i < cookies.length; i++) {
        cookies[i] = "";
    }

}


function deleteThisCookie(cookieName) {
    document.cookie = cookieName + "=";
}


function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function hasCookie(name){
   var x =  getCookie(name);
    if(x){
        return true;
    }else{
        return false;
    }
}

/*function getCookie(cookieNmae){
    var allCookies = document.cookie.split(";");
    var cookiesArray = [];
    for (var i = 0; i < allCookies.length; i++){
        var keys = (allCookies.split("=")[0]).trim();
        var values = (allCookies.split("=")[1]);
        cookiesArray[keys] = values;
    }
    return cookiesArray[cookieName];
}*/


function getAllCookies() {
    var cookies = document.cookie.split(';');
    var ret = '';
    for (var i = 1; i <= cookies.length; i++) {
        ret += i + ' - ' + cookies[i - 1] + "<br>";
    }
    return ret;
}