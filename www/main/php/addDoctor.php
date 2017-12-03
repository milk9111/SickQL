<?php
ini_set('display_errors', '1');
error_reporting(E_ALL);
//Created by Connor Lundberg and Morgan Blackmore
//Connect to the CSSGate Database
/*$dsn = 'mysql:host=cssgate.insttech.washington.edu;dbname=connorl2';
$username = 'connorl2';
$password = 'yandyu';*/

//Connect to the localhost Database
$dsn = 'mysql:host=localhost;dbname=connorl2';
$username = 'root';
$password = '';

//Get patient username and doctor username from patient home JS file
$patientName = $_GET['patientName'];
$dname = $_GET['doctorName'];

//Connect to the database
try {

    $db = new PDO($dsn, $username, $password);

    //Insert the many to many relationship for the doctor and patient
    $select_sql = "INSERT INTO AssignTo (patientUsername, doctorUsername, active) VALUES
                      (:patientName, :dname, :active)";
    $sql = $db->prepare($select_sql);

    $query = $sql->execute(array(":patientName"=>$patientName, ":dname"=>$dname, ":active"=>1));

    if ($query) {
        $result = array("code"=>100, "message"=>"Success");
    } else {
        $result = array("code"=>200, "message"=>"Failed");
    }

    echo json_encode($result);

    $sql = null;
    $db = null;
} catch (PDOException $e) {
    //Error message if something went wrong
    $error_message = $e->getMessage();
    $result = array("code"=>300, "message"=>"There was an error connecting to the database: $error_message");
    echo json_encode($result);
    exit();
}
?>