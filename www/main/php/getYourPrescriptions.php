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

try {

    $db = new PDO($dsn, $username, $password);

    //The query to execute. This will get all of the available doctors.
    $select_sql = "SELECT
                      namePre AS name,
                      dose,
                      cost,
                      frequency,
                      refillDate,
                      manufacturer
                    FROM Prescription
                    WHERE patientUsername = :uname AND active = 1";

    $sql = $db->prepare($select_sql);
    $sql->execute(array(":uname"=>$uname));

    $prescriptions = array();
    $i = 0;
    $broke = false;
    $query = $sql->fetchAll(PDO::FETCH_ASSOC);
    //Build a row for a prescription for the patient
    foreach ($query as $arr) {
        if ($arr) {
            $prescriptions[$i] = array("name"=>$arr['name'], "dose"=>$arr['dose'], "cost"=>$arr['cost'], "frequency"=>$arr['frequency'],
                "refill_date"=>$arr['refillDate'], "manufacturer"=>$arr['manufacturer']);
        } else {
            $broke = true;
            break;
        }
        $i++;
    }

    if ($broke) {
        $result = array("code"=>200, "message"=>"Unable to get Doctors for this Patient");
    } else {
        $result = array("code"=>100, "prescriptions"=>$prescriptions);
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
