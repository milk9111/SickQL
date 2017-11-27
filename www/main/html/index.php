<?php
/* ************************
 * This page will do one ofthe following:
 *   A. Send an unautorized user to the sign in page
 *   B. An authorized teacher to the teacher portal
 *   C. An authorized student to the student partal
 */

if(!isset($_SESSION)){
    session_start();
}

if (isset($_SESSION['userid'])) {  // determine if there is an authenticated user.
    switch (strtolower($_SESSION['role'])) {
        case "Patient":
            header( "Location: PatientHome.html");
            break;
        case "Doctor":
            header("Location: DrHome.html");
            break;
        default:
            header("Location: home.html");
            break;
    }
} else { // send then back to the signin page
    header ("Location:  home.html");
}

?>