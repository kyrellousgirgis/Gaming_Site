(function () {
    function Cookie() {
        var cookie = {

        }


        cookie.addCookie = function (cookieName, cookieValue, expirFlag) {
            if (arguments.length >= 2 || arguments.length <= 3) {
                if (expirFlag) {
                    today = new Date();
                    today.setMonth(today.getMonth() + expirFlag);
                    document.cookie = cookieName + "=" + encodeURIComponent(cookieValue)  + ";expires=" + today.toUTCString();
                } else {
                    document.cookie = cookieName + "=" + cookieValue;
                }
            } else {
                throw new Error("two to three arguments are allowed cookieName, cookieValue, [expiration Time]");
            }

        }

        cookie.deleteCookies = function () {
            document.cookie = "";
            for (var i = 0; i < cookies.length; i++) {
                cookies[i] = "";
            }
        }





        // cookie.getCookie = function(cookieName){
        //     debugger;
        //     var allCookies = document.cookie.split(";");
        //     var cookiesArray = [];
        //     for (var i = 0; i < allCookies.length; i++){
        //         var keys = (allCookies.split("=")[0]).trim();
        //         var values = decodeURIComponent((allCookies.split("=")[1]));
        //         cookiesArray[keys] = values;
        //     }
        //     return cookiesArray[cookieName];
        // }



        cookie.getCookie = function (name) {
            if (arguments.length == 1) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
                }
                return null;
            } else {
                throw new Error("you must send at least the cookie name ");
            }
        }

        cookie.deleteThisCookie = function (cookieName) {
            document.cookie = cookieName + "=";
        }

        cookie.hasCookie = function (name) {
            var x = getCookie(name);
            if (x) {
                return true;
            } else {
                return false;
            }
        }

        cookie.getAllCookies = function () {
            var cookies = document.cookie.split(';');
            var ret = '';
            for (var i = 1; i <= cookies.length; i++) {
                ret += i + ' - ' + cookies[i - 1] + "<br>";
            }
            return ret;
        }

        return cookie;
    }

    window.C = Cookie();
})()