
/**
 * Called on start up of the webpage. It kicks off the whole thing by retrieving the cookie
 * that was set on drHome.html and will be used to for the PHP file.
 */

var doctorUserName = "";
var doctorFullName = "";
var patientUserName = "";

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

    //Check to make sure all fields are not empty
    if(name.length > 0 && dose.length > 0 && cost.length > 0 && frequency.length > 0 && refill.length > 0 && manu.length > 0) {

        //Make call to php to update information
        var xhttp = new XMLHttpRequest();
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
    } else {
        console.log("test2");
        //Make alerts
        if(name.length == 0) {
            alert("Prescription name can't be empty!");
        }
        if(dose.length == 0) {
            alert("Dose can't be empty!");
        }
        if(cost.length == 0) {
            alert("Cost can't be empty!");
        }
        if(frequency.length == 0) {
            alert("Frequency can't be empty!");
        }
        if(refill.length == 0) {
            alert("Refill can't be empty!")
        }
        if(manu.length == 0) {
            alert("Manufacturer can't be empty!");
        }
    }

}


















