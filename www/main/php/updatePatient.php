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

$uname = $_POST['username'];
$fullname = $_POST['fullname'];
$pwd = $_POST['password'];
$type = $_POST['type'];

?>