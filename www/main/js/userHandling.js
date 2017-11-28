
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
        xhttp.open("GET", "http://cssgate.insttech.washington.edu/~connorl2/home/main/php/login.php?username="+uname+"&password="+pwd, false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert("in here");
                //alert(this.responseText);
                var res = this.response;
                alert(this.responseText + " is the responseText");
                var result = JSON.parse(res);
                alert(result);
            }
        }

        xhttp.send();
        //console.log(result);
        //var obj = JSON.parse(result);
        //console.log("message: " + obj['message']);
    } else {
        if (uname.length > 32) {
            alert("Username must be less than 32 characters");
        } else if (pwd.length < 5 || pwd.length > 32) {
            alert("Password must be between 5 and 32 characters");
        }
    }
}


function register (uname, pwd, confPwd) {

}