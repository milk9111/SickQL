<?php
    ini_set('display_errors', '1');
    error_reporting(E_ALL);
    //Created by Connor Lundberg
    //Connect to the CSSGate Database
    /*$dsn = 'mysql:host=cssgate.insttech.washington.edu;dbname=connorl2';
    $username = 'connorl2';
    $password = 'yandyu';*/

    //Connect to the localhost Database
    $dsn = 'mysql:host=localhost;dbname=connorl2';
    $username = 'root';
    $password = '';

    $uname = $_GET['username'];
    $pwd = $_GET['password'];
    try {

        $db = new PDO($dsn, $username, $password);

        //this checks if the email is found within the Doctor table
        $select_sql = "SELECT password, fullname FROM `Doctor` WHERE username = '" . $uname. "'";
        $user_query = $db->query($select_sql);

        $currPwd = $user_query->fetchAll(PDO::FETCH_ASSOC);
        if ($currPwd) {
            if ($currPwd[0]["password"] == $pwd) { //check password for validity
                $result = array("code"=>100, "message"=>"Sign in successful", "role"=>"Doctor", "fullname"=>"".$currPwd[0]['fullname']);
            } else { //password was not valid, return a JSON with error code 200 and message to display to user
                $result = array("code"=>200, "message"=>"Unable to sign in. Password invalid");
            }
        } else {
            //if it isn't in Doctor, then look in Patient
            $select_sql = "SELECT password, fullname FROM `Patient` WHERE username = '" . $uname. "'";
            $user_query = $db->query($select_sql);

            $currPwd = $user_query->fetchAll(PDO::FETCH_ASSOC);
            if($currPwd) {
                if ($currPwd[0]["password"] == $pwd) {
                    $result = array("code"=>100, "message"=>"Sign in successful", "role"=>"Patient", "fullname"=>"".$currPwd[0]['fullname']);
                } else {
                    $result = array("code"=>200, "message"=>"Unable to sign in. Password invalid");
                }
            } else {
                $result = array("code"=>200, "message"=>"Unable to sign in. Username not found");
            }
        }
        echo json_encode($result); //encode the PHP array into a JSON string and return it to the calling application

        //these both need to be set to null in order to close the db connection
        $user_query = null;
        $db = null;
    } catch (PDOException $e) { //if at anytime the Database connection fails, an error code 300 and stack trace will be returned
        $error_message = $e->getMessage();
        $result = array("code"=>300, "message"=>"Unable to sign in. There was an error connecting to the database: $error_message");
        echo json_encode($result);
        exit();
    }


?>
