/**
 * Called on start up of the webpage. It kicks off the whole thing by retrieving the cookie
 * that was set on sign in or register in order to know who we're dealing with.
 *
 * This will then make the table that is used by the Doctor and show it on the
 * webpage.
 */
function startUp () {
    var cookie = document.cookie;
    console.log(cookie);
    var params = cookie.split("&");
    var uname = params[0].substring(params[0].indexOf('=')+1);
    var fullname = params[1].substring(params[1].indexOf('=')+1);
    console.log("uname is: " + uname);
    console.log("fullname is: " + fullname)
    $('#name').text(fullname);

    makePatientTable (uname);
}


function makePatientTable (uname) {
    var xhttp = new XMLHttpRequest();
    //xhttp.open("GET", "http://cssgate.insttech.washington.edu/~connorl2/home/main/php/login.php?username="+uname+"&password="+pwd, false);
    //xhttp.open("GET", "localhost/SickQL/www/main/php/login.php?username="+uname+"&password="+pwd, false);
    xhttp.open("GET", "../php/getPatientsForDoctor.php?username="+uname, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var res = this.response;
            var result = JSON.parse(res);

            if (result['code'] == 100) {
                var patients = result['patients'];
                console.log(patients);
                var html = $('#patients_table').html();

                for (var i = 0; i < patients.length; i++) {
                    html += "<tr id='" + patients[i]['username'] + "'>";
                    html += "<td>" + patients[i]['fullname'] + "</td>";
                    html += "<td>" + patients[i]['height'] + "</td>";
                    html += "<td>" + patients[i]['weight'] + "</td>";
                    html += "<td>" + patients[i]['age'] + "</td>";
                    html += "<td><button type=\"button\" class=\"btn btn-default btn-sm\" onclick='addPrescription(" + "\"" + patients[i]['username'] + "\"" + ", " + "\"" + uname + "\"" +")' id=\"addPresBut\">\n" +
                        "                <span class=\"glyphicon glyphicon-plus\"></span> Add Prescription\n" +
                        "            </button></td>\n" +
                        "            <td><button type=\"button\" class=\"btn btn-default btn-sm\" onclick='updatePatient(" + "\"" + patients[i]['username'] + "\"" + ")' id=\"updateBut\">\n" +
                        "                <span class=\"glyphicon glyphicon-plus\"></span> Update Patient\n" +
                        "            </button></td>\n" +
                        "            <td><button type=\"button\" class=\"btn btn-default btn-sm\" onclick='removePatient(" + "\"" + patients[i]['username'] + "\"" + ")' id=\"removeBut\">\n" +
                        "                <span class=\"glyphicon glyphicon-minus\"></span> Remove Patient\n" +
                        "            </button></td>"
                    html += "</tr>";
                    //var prev = $('#patients_table').html();
                   // console.log(prev + html);
                }
                $('#patients_table tbody').replaceWith(html);
            }
        }
    }

    xhttp.send();
}

//Remove the patient
function removePatient(patientName) {
    console.log("Remove Patient: " + patientName);
}

//Update the patient information
function updatePatient(patientName) {
    console.log("Update Patient: " + patientName);
}

//Add prescription to patient
function addPrescription(patientName, doctorName) {
    console.log("Add Prescription to Patient: " + patientName + " " + "Doctor: " + doctorName);
}


















