
/**
 * Checks that the Username and Password follow the correct formats. If so, then send to
 * backend to verify account existence and correctness. This will return a JSON with either
 * an error message explaining what is wrong, or a success message and role type (Doctor or Patient).
 * If successful, this will move onto the next page, which is determined by role type.
 *
 * @param uname
 * @param pwd
 * @author Connor
 */
function login(uname, pwd) {
    if (uname.length <= 32 && pwd.length >= 5 && pwd.length <= 32) {
        var xhttp = new XMLHttpRequest();
        //xhttp.open("GET", "http://cssgate.insttech.washington.edu/~connorl2/home/main/php/login.php?username="+uname+"&password="+pwd, false);
        //xhttp.open("GET", "localhost/SickQL/www/main/php/login.php?username="+uname+"&password="+pwd, false);
        xhttp.open("GET", "../php/login.php?username="+uname+"&password="+pwd, false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var res = this.response;
                var result = JSON.parse(res);
                alert(result['message'] + "\n" + result['role']);
                if (result['role'] === "Doctor") {
                    alert("in here");
                    window.location.href = "../html/DrHome.html";
                    return false;
                } else {
                    window.location.href = "../html/PatientHome.html";
                    return false;
                }
            }
        }

        xhttp.send();
    } else {
        if (uname.length > 32) {
            alert("Username must be less than 32 characters");
        } else if (pwd.length < 5 || pwd.length > 32) {
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
    var type = $('button[name="role"].active').val();
    alert(type);
    if (uname.length <= 32 && pwd.length >= 5 && pwd.length <= 32 && pwd === confPwd
        && fullname.length > 0 && fullname.length <= 32 && type.length != 0) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "../php/register.php?username="+uname+"&fullname="+fullname+"&password="+pwd+"&type="+type, false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var res = this.response;
                var result = JSON.parse(res);
                alert(result['message'] + "\n" + result['role']);
                if (result['role'] === "Doctor") {
                    alert("in here");
                    window.location.href = "../html/DrHome.html";
                    return false;
                } else {
                    window.location.href = "../html/PatientHome.html";
                    return false;
                }
            }
        }

        xhttp.send();
    } else {
        if (uname.length > 32) {
            alert("Username must be less than 32 characters");
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