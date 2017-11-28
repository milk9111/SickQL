
/**
 * Checks that the Username and Password follow the correct formats. If so, then send to
 * backend to verify account existence and correctness. This will return a JSON with either
 * an error message explaining what is wrong, or a success message and role type (Doctor or Patient).
 * If successful, this will move onto the next page, which is determined by role type.
 *
 * @param uname
 * @param psw
 * @author Connor
 */
function login(uname, psw) {
    if (uname.length <= 32 && psw.length >= 5 && psw.length <= 32) {

    } else {
        if (uname.length > 32) {
            console.log("Username too big");
            alert("Username must be less than 32 characters");
            //$('#besideUname').innerHTML = "Username must be less than 32 characters";
        } else if (psw.length < 5 || psw.length > 32) {
            console.log("Password not right size: " + psw.length);
            alert("Password must be between 5 and 32 characters");
            //$('#besidePsw').innerText = "Password must be between 5 and 32 characters";
        }
    }
}


function register (uname, psw, confPsw) {

}