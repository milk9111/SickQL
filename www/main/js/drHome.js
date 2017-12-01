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
    var cookie = document.cookie;
    console.log(cookie);
    var params = cookie.split("&");
    var uname = params[0].substring(params[0].indexOf('=')+1);
    doctorUsername = uname;
    var fullname = params[1].substring(params[1].indexOf('=')+1);
    doctorFullname = fullname;

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
                        "            <td><button type=\"button\" class=\"btn btn-default btn-sm\" onclick='removePatient(" + "\"" + uname + "\"," + "\"" + patients[i]['username'] + "\"" + ")' id=\"removeBut\">\n" +
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
function removePatient(doctorUsername, patientName) {
    console.log("Remove Patient: " + patientName);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../php/removePatient.php?patientName="+patientName+"&doctorName="+doctorUsername, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var res = this.response;
            var result = JSON.parse(res);
            console.log(result);
            if (result['code'] == 100) {
                location.reload(true);
            } else {
                alert("Failed to remove the Patient from your list");
            }
        }
    }
    xhttp.send();
}

//Update the patient information
function updatePatient(patientName) {
    console.log("Update Patient: " + patientName);

    //document.cookie = "patientUsername=" + patientName;
    patientToUpdate = patientName;
    window.location.href = "../html/updatePatient.html";
}


function updatePatientInfo(height, weight, age) {
    console.log("Updating " + patientToUpdate);

    if (height.length > 0 && weight.length > 0 && age.length > 0) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "../php/updatePatient.php?patientName=" + patientToUpdate + "&height=" + height + "&weight=" + weight + "&age=" + age, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var res = this.response;
                var result = JSON.parse(res);
                console.log(result);
                if (result['code'] == 100) {
                    location.reload(true);
                } else {
                    alert("Failed to update the Patient information");
                }
            }
        }
        xhttp.send();
    } else {
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


function cancel () {
    document.cookie = document.cookie="username="+doctorUsername+"&fullname="+doctorFullname;
    window.location.href = "../html/DrHome.html";
}


//Add prescription to patient
function addPrescription(patientName, doctorName) {
    console.log("Add Prescription to Patient: " + patientName + " " + "Doctor: " + doctorName);
}


















