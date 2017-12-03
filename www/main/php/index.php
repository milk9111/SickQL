<?php
/* ************************
 * Created by Brandon Blaschke and Kevin Anderson
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