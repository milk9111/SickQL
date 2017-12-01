
/**
 * Called on start up of the webpage. It kicks off the whole thing by retrieving the cookie
 * that was set on drHome.html and will be used to for the PHP file.
 */

var doctorUserName;
var patientUserName;

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

    doctorUserName = (getCookie("doctorName"));
    patientUserName = (getCookie("patientName"));
}


//Add prescription to patient
function submitPrescription(name, dose, cost, frequency, refill, manu) {

    //console.log("Submited: " + patientUserName + " " + doctorUserName + " " + name + " " + dose + " " + cost + " " + frequency + " " + refill + " " + manu);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../php/addPrescription.php?patientName="+patientUserName+"&prename="+name, true);
    //xhttp.open("GET", "../php/addPrescription.php?patientName="+patientUserName+"&doctorName="+doctorUserName+"&dose="dose+"&cost="cost+"&freq="frequency+"&refill="refill+"&manu="manu, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.send();
    window.location.href = "../html/drHome.html";
}


















