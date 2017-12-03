<?php
/**
 * Created Morgan Blackmore and Connor Lundberg
 * Date: 11/30/2017
 * Time: 2:35 PM
 */
if(!isset($_SESSION)){
    session_start();
}
//Connect to the localhost Database
$dsn = 'mysql:host=localhost;dbname=connorl2';
$username = 'root';
$password = '';

//Get the patient information from the JS file to update
$uname = $_GET['patientName'];
$height = $_GET['height'];
$weight = $_GET['weight'];
$age = $_GET['age'];

//Connect to the database
try {

    $db = new PDO($dsn, $username, $password);

    //Update patient info
    $select_sql = "UPDATE Patient
                    SET height = :height, weight = :weight, age = :age
                    WHERE username = :uname";
    $sql = $db->prepare($select_sql);

    $query = $sql->execute(array(":height"=>$height, ":weight"=>$weight, ":age"=>$age, ":uname"=>$uname));

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