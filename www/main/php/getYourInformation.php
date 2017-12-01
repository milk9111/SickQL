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

    //The query to execute. This will get all of the information about the given patient.
    $select_sql = "SELECT
                      height,
                      weight,
                      age
                    FROM Patient
                    WHERE username = :uname";

    //because we are preparing the statement, we call that here
    $sql = $db->prepare($select_sql);

    //execute the prepared statement with the given array that contains the key/value pair
    //of the username to insert into the sql statement.
    $sql->execute(array(":uname"=>$uname));

    $query = $sql->fetchAll(PDO::FETCH_ASSOC); //fetch all the results of the execution
    if ($query) {
        $result = array("code"=>100, "height"=>$query[0]['height'], "weight"=>$query[0]['weight'], "age"=>$query[0]['age']);
    } else {
        $result = array("code"=>200, "message"=>"Unable to get Information for this Patient");
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
