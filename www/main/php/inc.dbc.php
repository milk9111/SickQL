<?php
    //Created by Connor Lundberg
    function get_connection() {
        $userid   = 'connorl2';
        $password = 'yandyu';
        $host     = 'cssgate.insttech.washington.edu';
		$dbname   = 'connorl2';

		$dsn = 'mysql:host='.$host. ';dbname='.$dbname;

		try {
            $db = new PDO($dsn, $userid, $password);
        }
        catch(PDOException $e) {
            echo "Error connecting to database";
        }
	    return $db;
	}
?>