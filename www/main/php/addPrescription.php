<?php
/**
 * Created by IntelliJ IDEA.
 * User: Morgan
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

$uname = $_GET['patientName'];
$prename = $_GET['prename'];
$dose = $_GET['dose'];
$cost = $_GET['cost'];
$freq = $_GET['freq'];
$refill = $_GET['refill'];
$manu = $_GET['manu'];

//echo($uname);

try {

    $db = new PDO($dsn, $username, $password);

    $select_sql = "INSERT INTO Prescription (patientUsername, namePre, dose, cost, frequency, refillDate, manufacturer, active) VALUES
                     (:uname, :prename, :dose, :cost, :freq, :refill, :manu, '1')";
    $sql = $db->prepare($select_sql);

    $query = $sql->execute(array(":uname"=>$uname, ":prename"=>$prename, ":dose"=>$dose, ":cost"=>$cost, ":freq"=>$freq, ":refill"=>$refill, ":manu"=>$manu));

    if ($query) {
        $result = array("code"=>100, "message"=>"Success");
    } else {
        $result = array("code"=>200, "message"=>"Failed");
    }

    echo json_encode($result);

    $sql = null;
    $db = null;
} catch (PDOException $e) {
    $error_message = $e->getMessage();
    $result = array("code"=>300, "message"=>"There was an error connecting to the database: $error_message");
    echo json_encode($result);
    exit();
}

?>