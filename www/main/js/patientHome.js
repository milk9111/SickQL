/**
 * Called on start up of the webpage. It kicks off the whole thing by retrieving the cookie
 * that was set on sign in or register in order to know who we're dealing with.
 *
 * This will then make all of the tables that are used by the Patient and show them on the
 * webpage.
 */
function startUp () {
    var cookie = document.cookie;
    console.log("the cookie is: " + document.cookie);
    var params = cookie.split(";");
    var uname = params[0].split("&");

    var fullname = uname[1];
    var username = uname[0].substring(uname[0].indexOf("=")+1);

    //set the name field to show the right person is signed in succesfully
    $('#name').text(fullname);

    //make the tables
    makeYourInformationTable (username, fullname);
    makeYourPrescriptionsTable (username);
    makeAssignedDoctorTable (username);
    makeAvailableDoctorTable (username);
}


function makeYourInformationTable (uname, fullname) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../php/getYourInformation.php?username="+uname, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var res = this.response;
            var result = JSON.parse(res);

            if (result['code'] == 100) {
                var html = $('#patInfo').html();
                html += "<tr id='" + uname + "'>";
                html += "<td scope=\"col\">" + fullname + "</td>";
                html += "<td scope=\"col\">" + result['height'] + "</td>";
                html += "<td scope=\"col\">" + result['weight'] + "</td>";
                html += "<td scope=\"col\">" + result['age'] + "</td>";
                html += "</tr>";
                $('#patInfo tbody').replaceWith(html);
            }
        }
    }

    xhttp.send();
}


function makeYourPrescriptionsTable (uname) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../php/getYourPrescriptions.php?username="+uname, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var res = this.response;
            var result = JSON.parse(res);

            if (result['code'] == 100) {
                var prescriptions = result['prescriptions'];
                var html = $('#presInfo').html();

                for (var i = 0; i < prescriptions.length; i++) {
                    html += "<tr id='" + uname + "'>";
                    html += "<td scope=\"col\">" + prescriptions[i]['name'] + "</td>";
                    html += "<td scope=\"col\">" + prescriptions[i]['dose'] + "</td>";
                    html += "<td scope=\"col\">" + prescriptions[i]['cost'] + "</td>";
                    html += "<td scope=\"col\">" + prescriptions[i]['frequency'] + "</td>";
                    html += "<td scope=\"col\">" + prescriptions[i]['refill_date'] + "</td>";
                    html += "<td scope=\"col\">" + prescriptions[i]['manufacturer'] + "</td>";
                    html += "</tr>";
                }
                $('#presInfo tbody').replaceWith(html);
            }
        }
    }

    xhttp.send();
}


function makeAssignedDoctorTable (uname) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../php/getDoctorsForPatient.php?username="+uname, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var res = this.response;
            var result = JSON.parse(res);

            if (result['code'] == 100) {
                var doctors = result['doctors'];
                var html = $('#assigned_doctors_table').html();

                for (var i = 0; i < doctors.length; i++) {
                    html += "<tr id='" + doctors[i]['username'] + "'>";
                    html += "<td scope=\"col\">" + doctors[i]['fullname'] + "</td>";
                    html += "<td><button type=\"button\" class=\"btn btn-default btn-sm\" onclick='removeDoctor(" + "\"" + uname + "\"" + ", " + "\"" + doctors[i]['username'] + "\"" + ")' id=\"removeDoctorBut\">\n" +
                        "                <span class=\"glyphicon glyphicon-minus\"></span> Remove Doctor\n" +
                        "            </button></td>"
                    html += "</tr>";
                }
                $('#assigned_doctors_table tbody').replaceWith(html);
            }
        }
    }

    xhttp.send();
}



function makeAvailableDoctorTable (uname) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../php/getAvailableDoctors.php?username="+uname, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var res = this.response;
            var result = JSON.parse(res);

            if (result['code'] == 100) {
                var doctors = result['doctors'];
                var html = $('#allDocs').html();

                for (var i = 0; i < doctors.length; i++) {
                    html += "<tr id='" + i + "'>";
                    html += "<td scope=\"col\" id='" + doctors[i]['username'] + "'>" + doctors[i]['fullname'] + "</td>";
                    html += "<td><button type=\"button\" class=\"btn btn-default btn-sm\" onclick='addDoctor(" + "\"" + uname + "\"" + ", " + "\"" + doctors[i]['username'] + "\"" + ")' id=\"addDoctorBut\">\n" +
                        " <span class=\"glyphicon glyphicon-plus\"></span> Add Doctor\n" +
                        " </button></td>";
                    html += "</tr>";
                }
                $('#allDocs tbody').replaceWith(html);
            }
        }
    }

    xhttp.send();
}

//Removes a doctor from the patient
function removeDoctor (patientUsername, doctorUsername) {
    console.log(patientUsername + " " + doctorUsername);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../php/removeDoctor.php?patientName="+patientUsername+"&doctorName="+doctorUsername, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var res = this.response;
            var result = JSON.parse(res);
            console.log(result);
            if (result['code'] == 100) {
                location.reload(true);
            } else {
                alert("Failed to remove the Doctor from your list");
            }
        }
    }
    xhttp.send();
}

//Adds doctor to patient profile
function addDoctor (patientUsername, doctorUsername) {

    console.log(patientUsername + " " + doctorUsername);
    //I think this is right, not sure but the method does get the correct name of doctor and patient
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../php/addDoctor.php?patientName="+patientUsername+"&doctorName="+doctorUsername, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var res = this.response;
            var result = JSON.parse(res);
            console.log(result);
            if (result['code'] == 100) {
                location.reload(true);
            } else {
                alert("Failed to add the Doctor to your list");
            }
        }
    }
    xhttp.send();
}















