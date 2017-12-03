<?php
ini_set('display_errors', '1');
error_reporting(E_ALL);
//Craeted by Connor Lundberg and Morgan Blackmore
//Connect to the CSSGate Database
/*$dsn = 'mysql:host=cssgate.insttech.washington.edu;dbname=connorl2';
$username = 'connorl2';
$password = 'yandyu';*/

//Connect to the localhost Database
$dsn = 'mysql:host=localhost;dbname=connorl2';
$username = 'root';
$password = '';

//Get variables from JS file for when patient registers
$uname = $_POST['username'];
$fullname = $_POST['fullname'];
$pwd = $_POST['password'];
$type = $_POST['type'];

//Connect to the database
try {

    $db = new PDO($dsn, $username, $password);

    if (strcmp($type, "Doctor") == 0) { //determine the role the user is requesting to be
        $select_sql = "SELECT password FROM `Doctor` WHERE username = '" . $uname . "'";
        $isDoctor = true;
    } else {
        $select_sql = "SELECT password FROM `Patient` WHERE username = '" . $uname . "'";
        $isDoctor = false;
    }

    //Create query
    $user_query = $db->query($select_sql);

    $currPwd = $user_query->fetchAll(PDO::FETCH_ASSOC);
    if ($currPwd) { //if there is a password in the table for that email, then it is in use and the registration fails
        $result = array("code"=>200, "message"=>"Unable to register. Username already in use.");
    } else {
        //there was not a password in the table for the given email, but there might be for the other role,
        //so check that first before inserting (i.e. can't have a doctor be a patient and vice versa)
        if ($isDoctor == true) {
            $select_sql = "SELECT password FROM `Patient` WHERE username = '" . $uname . "'";
        } else {
            $select_sql = "SELECT password FROM `Doctor` WHERE username = '" . $uname . "'";
        }

       // echo $select_sql;
        $user_query = $db->query($select_sql);

        $currPwd = $user_query->fetchAll(PDO::FETCH_ASSOC);

        if ($currPwd) {
            $result = array("code"=>200, "message"=>"Unable to register. Username already in use.");
        } else {
            if ($isDoctor) { //if the type is Doctor and the user does not exist, insert
                $select_sql = "INSERT INTO $type VALUES ('" . $uname . "', '" . $fullname . "', '" . $pwd . "')";
                //echo $select_sql . "\n";
            } else { //if the type is Patient and the user does not exist, insert but with 0 valued medical info
                $select_sql = "INSERT INTO $type VALUES ('" . $uname . "', '" . $fullname . "', '" . $pwd . "', 0.0, 0.0, 0)";
                //echo $select_sql . "\n";
            }
            //echo $select_sql;
            $user_query = $db->query($select_sql);

            if ($user_query) { //if the insertion was successful, then tell the user and move to the appropriate home page
                $result = array("code" => 100, "message" => "Registration successful", "role" => "$type");
            } else { //else something went horribly wrong in the insertion and the registration failed when it should have succeeded
                $result = array("code" => 200, "message" => "Registration failed due to INSERT query.");
            }
        }
    }
    echo json_encode($result);

    $user_query = null;
    $db = null;
} catch (PDOException $e) {
    //Send error message if something went wrong
    $error_message = $e->getMessage();
    $result = array("code"=>300, "message"=>"Unable to sign in. There was an error connecting to the database: $error_message");
    echo json_encode($result);
    exit();
}
?>
