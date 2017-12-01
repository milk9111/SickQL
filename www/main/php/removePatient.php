<?php
ini_set('display_errors', '1');
error_reporting(E_ALL);

//Connect to the CSSGate Database
/*$dsn = 'mysql:host=cssgate.insttech.washington.edu;dbname=connorl2';
$username = 'connorl2';
$password = 'yandyu';*/

//Connect to the localhost Database
$dsn = 'mysql:host=localhost;dbname=connorl2';
$username = 'root';
$password = '';

$patientName = $_GET['patientName'];
$dname = $_GET['doctorName'];

try {

    $db = new PDO($dsn, $username, $password);

    $select_sql = "DELETE FROM assignto WHERE patientUsername = :patientName AND doctorUsername = :dname";
    $sql = $db->prepare($select_sql);

    $query = $sql->execute(array(":patientName"=>$patientName, ":dname"=>$dname));

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