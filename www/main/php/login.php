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
    $pwd = $_GET['password'];
    try {

        $db = new PDO($dsn, $username, $password);

        $select_sql = "SELECT password FROM `Doctor` WHERE email = '" . $uname. "'";
        $user_query = $db->query($select_sql);

        $currPwd = $user_query->fetchAll(PDO::FETCH_ASSOC);
        if ($currPwd) {
            if ($currPwd[0]["password"] == $pwd) {
                $result = array("code"=>100, "message"=>"Sign in successful", "role"=>"Doctor");

            } else {
                $result = array("code"=>200, "message"=>"Unable to sign in. Password invalid");
            }
        } else {
            $select_sql = "SELECT password FROM `Patient` WHERE email = '" . $uname. "'";
            $user_query = $db->query($select_sql);

            $currPwd = $user_query->fetchAll(PDO::FETCH_ASSOC);
            if($currPwd) {
                $result = array("code"=>100, "message"=>"Unable to sign in. Username not found");
            } else {
                $result = array("code"=>200, "message"=>"Unable to sign in. Username not found");
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
