//Created by Brandon Blaschkke and Connor Lundberg
//Global variables for use of document
var doctorUserName = "";
var doctorFullName = "";
var patientUserName = "";


/**
 * Called on start up of the webpage. It kicks off the whole thing by retrieving the cookie
 * that was set on drHome.html and will be used to for the PHP file.
 */
function startUp () {

    //Get cookies
    var cookie = document.cookie;
    var params = cookie.split(";");
    var uname = params[0].split("&");

    //Fill in global variables
    doctorUserName = uname[0].substring(uname[0].indexOf("=")+1);
    doctorFullName = uname[1];
    patientUserName = uname[2];
}


/*Add prescription to patient
* @param name Name of prescription
* @param dose Dose of prescription
* @param cost Cost of prescription
* @param frequency Frequency of prescription
* @param refill Refill date for prescription
* @param manu Manufactorer of prescription drug
 */
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
                var result = JSON.parse(res);

                if (result['code'] == 100) {
                    //go back to the DrHome.html as request was sent
                    window.location.href = "../html/DrHome.html";
                    document.cookie = "username=" + doctorUserName + "&" + doctorFullName + ";";
                } else {
                    //Alert doctor if something went wrong
                    alert("Failed to remove the Patient from your list");
                }
            }
        }

        xhttp.send();
    } else {
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

//Cancels the creation of a prescription
function cancel () {
    window.location.href = "../html/DrHome.html";
    document.cookie = "username="+dname+"&"+dFname+";";
}

//Signs out a user
function signOut() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href="../html/home.html";
}















