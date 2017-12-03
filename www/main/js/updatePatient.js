//Created by Connor Lundberg
//Gloabl variables used thorughout the document
//Doctor username
var dname = "";

//Doctor full name
var dFname = "";

//patient user name for JSON object
var uname = "";

//Actual patient username
var username = "";

//Start when html file opens and get cookies and set global variables
function startUp () {
    var cookie = document.cookie;
    var params = cookie.split(";");
    var uname = params[0].split("&");

    dname = uname[0].substring(uname[0].indexOf("=")+1);
    dFname = uname[1];
    username = uname[2];
}

/* Update the patient info
* @param height Height of the patient
* @param weight Weight of the patient
* @param age Age of the patient
 */
function updatePatientInfo(height, weight, age) {

    //Check that input is good
    if (height.length > 0 && weight.length > 0 && age.length > 0) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "../php/updatePatient.php?patientName=" + username + "&height=" + height + "&weight=" + weight + "&age=" + age, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.onreadystatechange = function () {

            //Check response
            if (this.readyState === 4 && this.status === 200) {
                var res = this.response;
                var result = JSON.parse(res);

                if (result['code'] == 100) {
                    //If good go back to drHome.html and carry cookies over
                    window.location.href = "../html/DrHome.html";
                    document.cookie="username="+dname+"&"+dFname+";";
                } else {
                    alert("Failed to update the Patient information");
                }
            }
        }
        xhttp.send();
    } else {
        //Alert user to error
        if (height.length == 0) {
            alert("Must specify a height");
        }
        if (weight.length == 0) {
            alert("Must specify a weight");
        }
        if (age.length == 0) {
            alert("Must specify an age");
        }
    }
}

//Cancels the page and goes back to drHome.html
function cancel () {
    window.location.href = "../html/DrHome.html";
    document.cookie = "username="+dname+"&"+dFname+";";
}

//Sign out of profile
function signOut() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href="../html/home.html";
}