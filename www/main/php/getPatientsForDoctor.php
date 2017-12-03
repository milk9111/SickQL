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

    //The query to execute. This will get all of the patients assigned to this doctor.
    $select_sql = "SELECT
                      Patient.username AS username,
                      Patient.fullname AS fullname,
                      Patient.height AS height,
                      Patient.weight AS weight,
                      Patient.age AS age
                    FROM Patient
                    JOIN
                          (
                            SELECT patientUsername
                            FROM AssignTo
                            WHERE doctorUsername = :uname AND active = 1
                          ) AS Matches
                      ON Patient.username = Matches.patientUsername";

    //because we are preparing the statement, we call that here
    $sql = $db->prepare($select_sql);

    //execute the prepared statement with the given array that contains the key/value pair
    //of the username to insert into the sql statement.
    $sql->execute(array(":uname"=>$uname));

    $patients = array();
    $i = 0;
    $broke = false;
    $query = $sql->fetchAll(PDO::FETCH_ASSOC); //fetch all the results of the execution
    foreach ($query as $arr) {
        if ($arr) { //if there were any results, then this will start making an array of arrays.
            $patients[$i] = array("username"=>$arr['username'], "fullname"=>$arr['fullname'],
                "height"=>$arr['height'], "weight"=>$arr['weight'], "age"=>$arr['age']);
        } else {
            $broke = true;
            break;
        }
        $i++;
    }

    if ($broke) {
        $result = array("code"=>200, "message"=>"Unable to get Patients for this Doctor");
    } else {
        $result = array("code"=>100, "patients"=>$patients);
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
