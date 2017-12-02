
///Global variables to be used through out drHome.js
var patientToUpdate = "";
var doctorUsername = "";
var doctorFullname = "";

/**
 * Called on start up of the webpage. It kicks off the whole thing by retrieving the cookie
 * that was set on sign in or register in order to know who we're dealing with.
 *
 * This will then make the table that is used by the Doctor and show it on the
 * webpage.
 */
function startUp () {

    //Get Cookie and split it by ';'
    var cookie = document.cookie;
    var params = cookie.split(";");
    var uname = params[0].split("&");

    //Doctor fullname and username
    doctorFullname = uname[1];
    doctorUsername = uname[0].substring(uname[0].indexOf("=")+1);

    //Set the heading of the webpage to include the doctors name
    $('#name').text(doctorFullname);

    //Make patient table to display to the doctor
    makePatientTable (doctorUsername, doctorFullname);
}

/*Makes a patient table
* @param uname User name of doctor
* @param fullname Full name of the doctor*/
function makePatientTable (uname, fullname) {

    //Start xhttpRequest to php file
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../php/getPatientsForDoctor.php?username="+uname, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //Dispaly data if correct
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {

            //get JSON
            var res = this.response;
            var result = JSON.parse(res);

            if (result['code'] == 100) {

                //Get patients and html for the table
                var patients = result['patients'];
                var html = $('#patients_table').html();

                //Create the table
                for (var i = 0; i < patients.length; i++) {
                    html += "<tr id='" + patients[i]['username'] + "'>";
                    html += "<td>" + patients[i]['fullname'] + "</td>";
                    html += "<td>" + patients[i]['height'] + "</td>";
                    html += "<td>" + patients[i]['weight'] + "</td>";
                    html += "<td>" + patients[i]['age'] + "</td>";

                    //Buttons for manipulating data on patients
                    html += "<td><button type=\"button\" class=\"btn btn-default btn-sm\" onclick='addPrescription(" + "\"" + patients[i]['username'] + "\"" + ", " + "\"" + uname + "\"" +")' id=\"addPresBut\">\n" +
                        "                <span class=\"glyphicon glyphicon-plus\"></span> Add Prescription\n" +
                        "            </button></td>\n" +
                        "            <td><button type=\"button\" class=\"btn btn-default btn-sm\" onclick='updatePatient(" + "\"" + uname + "\"," + "\"" + fullname+ "\"," + "\"" + patients[i]['username'] + "\"" + ")' id=\"updateBut\">\n" +
                        "                <span class=\"glyphicon glyphicon-plus\"></span> Update Patient\n" +
                        "            </button></td>\n" +
                        "            <td><button type=\"button\" class=\"btn btn-default btn-sm\" onclick='removePatient(" + "\"" + uname + "\"," + "\"" + patients[i]['username'] + "\"" + ")' id=\"removeBut\">\n" +
                        "                <span class=\"glyphicon glyphicon-minus\"></span> Remove Patient\n" +
                        "            </button></td>"
                    html += "</tr>";
                }
                $('#patients_table tbody').replaceWith(html);
            }
        }
    }

    xhttp.send();
}

/*Remove the patient from doctors list
* @paramdoctorUsername: Username for the doctor
* @param patientName: Patient username to be removed*/
function removePatient(doctorUsername, patientName) {

    //Start xhttpRequest
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../php/removePatient.php?patientName="+patientName+"&doctorName="+doctorUsername, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var res = this.response;
            var result = JSON.parse(res);
            if (result['code'] == 100) {

                //Reload the page to display new results
                location.reload(true);
            } else {

                //If failed alert user to failure
                alert("Failed to remove the Patient from your list");
            }
        }
    }
    xhttp.send();
}

/*Update the patient information
* dname: Doctors name
* dFname: Doctors first name
* patientName: Patient username*/
function updatePatient(dname, dFname, patientName) {

    patientToUpdate = patientName;
    window.location.href = "../html/updatePatient.html";
    document.cookie = "username="+dname+"&"+dFname+"&"+patientName+";";
}


/*Add prescription to patient
* patientName: Patient username
* doctorName: Doctor username*/
function addPrescription(patientName, doctorName) {

    document.cookie = "username=" + doctorName + "&" + doctorFullname + "&" + patientName + ";";
    window.location.href = "../html/addPrescription.html";
}

//Sigout a user
function signOut() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href="../html/home.html";
}


















