/**
 * Called on start up of the webpage. It kicks off the whole thing by retrieving the cookie
 * that was set on sign in or register in order to know who we're dealing with.
 *
 * This will then make all of the tables that are used by the Patient and show them on the
 * webpage.
 *
 * Created By Connor
 */
function startUp () {

    //Get cookies
    var cookie = document.cookie;
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

/* Makes the information table for the patient showing their values
* @param uname Username for patient
* @param fullname Full name of the patient
 */
function makeYourInformationTable (uname, fullname) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../php/getYourInformation.php?username="+uname, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var res = this.response;
            var result = JSON.parse(res);

            //Create one row of data for the patient with their values
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

/* Make the table holding all the patients prescriptions
* @param uname Username of patient
 */
function makeYourPrescriptionsTable (uname) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../php/getYourPrescriptions.php?username="+uname, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var res = this.response;
            var result = JSON.parse(res);

            if (result['code'] == 100) {
                //If good get html for table
                var prescriptions = result['prescriptions'];
                var html = $('#presInfo').html();

                //for every prescription create a row for it with its data
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

/* Creates the table of assigned doctors to a patient
* @param uname Username for patient
 */
function makeAssignedDoctorTable (uname) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../php/getDoctorsForPatient.php?username="+uname, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var res = this.response;
            var result = JSON.parse(res);

            if (result['code'] == 100) {
                //Get doctors and html for table
                var doctors = result['doctors'];
                var html = $('#assigned_doctors_table').html();

                //For every doctor add give them a row and insert their data
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

/* Creates the table of available doctors a patient can add to their profile
* @param uname Patient username
 */
function makeAvailableDoctorTable (uname) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../php/getAvailableDoctors.php?username="+uname, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var res = this.response;
            var result = JSON.parse(res);

            if (result['code'] == 100) {
                //Get all avaialbe doctors and html for table
                var doctors = result['doctors'];
                var html = $('#allDocs').html();

                //For every doctor create a single row and insert their data
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

/*Removes a doctor from the patient
* @param patientUsername Patient's user name
* @param doctorUsername Doctor's user name
 */
function removeDoctor (patientUsername, doctorUsername) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../php/removeDoctor.php?patientName="+patientUsername+"&doctorName="+doctorUsername, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var res = this.response;
            var result = JSON.parse(res);
             if (result['code'] == 100) {
                //After remove from database make sure to reload page to see difference
                location.reload(true);
            } else {
                //Alert user if something was wrong
                alert("Failed to remove the Doctor from your list");
            }
        }
    }
    xhttp.send();
}

/*Adds doctor to patient profile
* @param patientUsername Patient's user name
* @param doctorUsername Doctor's user name
 */
function addDoctor (patientUsername, doctorUsername) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../php/addDoctor.php?patientName="+patientUsername+"&doctorName="+doctorUsername, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var res = this.response;
            var result = JSON.parse(res);
            console.log(result);
            if (result['code'] == 100) {
                //Reload page to show results of query
                location.reload(true);
            } else {
                //Alert user if something went wrong
                alert("Failed to add the Doctor to your list");
            }
        }
    }
    xhttp.send();
}

//Signs out a profile
function signOut() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href="../html/home.html";
}












