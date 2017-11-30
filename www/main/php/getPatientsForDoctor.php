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

$uname = $_GET['username'];

try {

    $db = new PDO($dsn, $username, $password);

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
                            WHERE doctorUsername = :uname
                          ) AS Matches
                      ON Patient.username = Matches.patientUsername";
    //echo $select_sql;
    $sql = $db->prepare($select_sql);

    $sql->execute(array(":uname"=>$uname));
    //echo $sql;
    //$user_query = $db->query($select_sql);

    $patients = array();
    $i = 0;
    $broke = false;
    $query = $sql->fetchAll(PDO::FETCH_ASSOC);
    foreach ($query as $arr) {
        if ($arr) {
            //echo $arr['username'], $arr['fullname'];
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

    //$request = $user_query->fetchAll(PDO::FETCH_ASSOC);
   /* if ($request) { //if there is a password in the table for that email, then it is in use and the registration fails

        for($i = 0; $i < count($request); $i++) {
            $patients[$i] = array("username"=>$request[$i]['username'], "fullname"=>$request[$i]['username'],
                            "height"=>$request[$i]['height'], "weight"=>$request[$i]['weight'], "age"=>$request[$i]['age']);
        }
        $result = array("code"=>100, "patients"=>$patients);
    } else {
        $result = array("code"=>200, "message"=>"Unable to get Patients for this Doctor");
    }*/
    echo json_encode($result);

    $user_query = null;
    $db = null;
} catch (PDOException $e) {
    $error_message = $e->getMessage();
    $result = array("code"=>300, "message"=>"There was an error connecting to the database: $error_message");
    echo json_encode($result);
    exit();
}
?>
