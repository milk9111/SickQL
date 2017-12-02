
/**
 * Called on start up of the webpage. It kicks off the whole thing by retrieving the cookie
 * that was set on drHome.html and will be used to for the PHP file.
 */

var doctorUserName = "";
var doctorFullName = "";
var patientUserName = "";

//Gets the cookie for cookie name provided
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function startUp () {

    var cookie = document.cookie;
    console.log(cookie);
    var params = cookie.split(";");
    var uname = params[0].split("&");
    doctorUserName = uname[0].substring(uname[0].indexOf("=")+1);
    doctorFullName = uname[1];
    patientUserName = uname[2];
}


//Add prescription to patient
function submitPrescription(name, dose, cost, frequency, refill, manu) {

    //console.log("Submited: " + patientUserName + " " + doctorUserName + " " + name + " " + dose + " " + cost + " " + frequency + " " + refill + " " + manu);

    var xhttp = new XMLHttpRequest();
    //xhttp.open("GET", "../php/addPrescription.php?patientName="+patientUserName+"&prename="+name+"&dose=", true);
    xhttp.open("GET", "../php/addPrescription.php?patientName="+patientUserName+"&prename="+name+"&dose="+dose+"&cost="+cost+"&freq="+frequency+"&refill="+refill+"&manu="+manu, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var res = this.response;
            console.log(res);
            var result = JSON.parse(res);

            if (result['code'] == 100) {
                window.location.href = "../html/DrHome.html";
                document.cookie = "username=" + doctorUserName + "&" + doctorFullName + ";";
            } else {
                alert("Failed to remove the Patient from your list");
            }
        }
    }

    xhttp.send();
}


function signOut() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href="../html/home.html";
}















