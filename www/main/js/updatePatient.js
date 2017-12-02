var dname = "";
var dFname = "";
var uname = "";
var username = "";


function startUp () {
    var cookie = document.cookie;
    console.log("the cookie is: " + document.cookie);
    var params = cookie.split(";");
    var uname = params[0].split("&");

    dname = uname[0].substring(uname[0].indexOf("=")+1);
    dFname = uname[1];
    username = uname[2];

    console.log("dname: " + dname + "\n" + "dFname: " + dFname + "\n" + "username: " + username + "\n")
}


function updatePatientInfo(height, weight, age) {
    console.log("Updating " + username);

    if (height.length > 0 && weight.length > 0 && age.length > 0) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "../php/updatePatient.php?patientName=" + username + "&height=" + height + "&weight=" + weight + "&age=" + age, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var res = this.response;
                console.log(res);
                var result = JSON.parse(res);

                if (result['code'] == 100) {
                    window.location.href = "../html/DrHome.html";
                    document.cookie="username="+dname+"&"+dFname+";";
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
    window.location.href = "../html/DrHome.html";
    document.cookie = "username="+dname+"&"+dFname+";";
}