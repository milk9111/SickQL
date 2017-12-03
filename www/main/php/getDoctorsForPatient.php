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

$uname = $_GET['username'];

try {

    $db = new PDO($dsn, $username, $password);

    //The query to execute. This will get all of the doctors assigned to this patient.
    $select_sql = "SELECT
                      Doctor.username AS username,
                      Doctor.fullname AS fullname
                    FROM Doctor
                    JOIN
                          (
                            SELECT doctorUsername
                            FROM AssignTo
                            WHERE patientUsername = :uname AND active = 1
                          ) AS Matches
                      ON Doctor.username = Matches.doctorUsername";

    $sql = $db->prepare($select_sql);
    $sql->execute(array(":uname"=>$uname));

    $doctors = array();
    $i = 0;
    $broke = false;
    $query = $sql->fetchAll(PDO::FETCH_ASSOC);
    //Build row for the patient that the doctor has
    foreach ($query as $arr) {
        if ($arr) {
            $doctors[$i] = array("username"=>$arr['username'], "fullname"=>$arr['fullname']);
        } else {
            $broke = true;
            break;
        }
        $i++;
    }

    if ($broke) {
        $result = array("code"=>200, "message"=>"Unable to get Doctors for this Patient");
    } else {
        $result = array("code"=>100, "doctors"=>$doctors);
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
