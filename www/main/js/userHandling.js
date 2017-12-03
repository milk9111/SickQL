
/**
 * Checks that the Username and Password follow the correct formats. If so, then send to
 * backend to verify account existence and correctness. This will return a JSON with either
 * an error message explaining what is wrong, or a success message and role type (Doctor or Patient).
 * If successful, this will move onto the next page, which is determined by role type.
 * Created by Connor Lundberg
 * @param uname
 * @param pwd
 * @author Connor
 */
function login(uname, pwd) {
    if (uname.length <= 32 && pwd.length >= 5 && pwd.length <= 32) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "../php/login.php?username="+uname+"&password="+pwd, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var res = this.response;
                var result = JSON.parse(res);

                //If successful take to doctor home
                if (result['code'] == 100) {
                    if (result['role'] === "Doctor") {
                        window.location.href = "../html/DrHome.html";
                        document.cookie="username="+uname+"&"+result['fullname']+";fullname="+result['fullname']+";";
                    } else {
                        //if not a doctor must be a patient, take to patient home
                        window.location.href = "../html/PatientHome.html";
                        document.cookie="username="+uname+"&"+result['fullname']+";fullname="+result['fullname']+";";
                    }
                } else {
                    //Something went wrong and error
                    alert(result['message']);
                }
            }
        }

        xhttp.send();
    } else {
        //Check input
        if (uname.length > 32 || uname.length < 5) {
            alert("Username must be between 5 and 32 characters");
        }
        if (pwd.length < 5 || pwd.length > 32) {
            alert("Password must be between 5 and 32 characters");
        }
    }
}


/**
 * Checks if the username, fullname, and both password fields are of correct form. That is, if
 * the username is less than or equal to 32, the password length is between 5-32, the fullname
 * length is less than or equal to 32, and that the password and confirm password values match.
 * If those tests pass then a call will be made to the backend requesting for a new user. That
 * will make a check to see if the user has already been created for that username, if so, then
 * deny request, otherwise make the new user and continue to the appropriate role type homepage.
 *
 * @param uname
 * @param fullname
 * @param pwd
 * @param confPwd
 * @author Connor
 */
function register (uname, fullname, pwd, confPwd) {
    var type = $("input[name='type']:checked").val();

    /*
        This checks for correctness of the values. Right now it only looks to make
        sure that the fields are of the correct length and that the password and
        confirm password fields are the same and that the role type was selected.
    */
    if (uname.length >= 5 && uname.length <= 32 && pwd.length >= 5 && pwd.length <= 32 && pwd === confPwd
        && fullname.length > 0 && fullname.length <= 32 && type.length != 0) {
        var xhttp = new XMLHttpRequest();

        //here we open our XMLHttpRequest with a GET command. String after is the URL and parameter values. The
        //false is for whether this is asynchronous or not.
        xhttp.open("POST", "../php/register.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var res = this.response;
                var result = JSON.parse(res);

                if (result['code'] == 100) {
                    if (result['role'] === "Doctor") {
                        window.location.href = "../html/DrHome.html";
                        document.cookie="username="+uname+"&"+fullname+";";
                        //return false;
                    } else {
                        window.location.href = "../html/PatientHome.html";
                        document.cookie="username="+uname+"&"+fullname+";";
                        //return false;
                    }
                } else {
                    alert(result['message']);
                }
            }
        }

        xhttp.send("username="+uname+"&fullname="+fullname+"&password="+pwd+"&type="+type);
    } else {

        //Check if register information is correct
        if (uname.length > 32 || uname.length < 5) {
            alert("Username must be between 5 and 32 characters");
        }
        if (pwd.length < 5 || pwd.length > 32) {
            alert("Password must be between 5 and 32 characters");
        }
        if (!(pwd === confPwd)) {
            alert("Password fields don't match");
        }
        if (fullname.length > 32 || fullname.length === 0) {
            alert("Full Legal Name must be less than 32 characters");
        }
        if (type.length === 0) {
            alert("Must choose a role type");
        }
    }
}

//Sigout of profile
function signOut() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href="../html/home.html";
}
