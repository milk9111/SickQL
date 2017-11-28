<?php
ini_set('display_errors', '1');
error_reporting(E_ALL);

//Connect to the Database
/*$dsn = 'mysql:host=cssgate.insttech.washington.edu;dbname=connorl2';
$username = 'connorl2';
$password = 'yandyu';*/

$dsn = 'mysql:host=localhost;dbname=connorl2';
$username = 'root';
$password = '';

$uname = $_GET['username'];
$fullname = $_GET['fullname'];
$pwd = $_GET['password'];
$type = $_GET['type'];
try {

    $db = new PDO($dsn, $username, $password);

    /*if (strcmp($type, "Doctor") == 0) {
        $select_sql = "SELECT password FROM `Doctor` WHERE email = '" . $uname . "'";
    } else {
        $select_sql = "SELECT password FROM `Patient` WHERE email = '" . $uname . "'";
    }*/
    $select_sql = "SELECT password FROM $type WHERE email = '" . $uname . "'";
    echo $select_sql;
    $user_query = $db->query($select_sql);

    $currPwd = $user_query->fetchAll(PDO::FETCH_ASSOC);
    if ($currPwd) {
        $result = array("code"=>200, "message"=>"Unable to register. Username already in use.");
    } else {
        $select_sql = "INSERT INTO $type VALUES ('" . $uname . "', '" . $fullname . "', '" . $pwd . "', 0.0, 0.0, 0)";
        echo $select_sql;
        $user_query = $db->query($select_sql);

        if($user_query) {
            $result = array("code"=>100, "message"=>"Success", "role"=>"$type");
        } else {
            $result = array("code"=>200, "message"=>"Registration failed.");
        }
    }
    echo json_encode($result);
    $db = null;
} catch (PDOException $e) {
    $error_message = $e->getMessage();
    $result = array("code"=>300, "message"=>"Unable to sign in. There was an error connecting to the database: $error_message");
    echo json_encode($result);
    exit();
}
?>
