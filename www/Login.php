<?php


if (isset($_POST['login'])) // HANDLE THE FORM
{
   
  // CHECK TO ENSURE INPUTS ARE VALID
  if (strlen($_POST['username']) == 0 || strlen($_POST['pwd']) == 0)
  {
    $errors = '<p class="alert-danger">Please enter both a username and a password</p>';
  } else {
    // CHECK USER IN DATABASE, THIS IS SUSEPTABLE TO SQL INJECTION AND FAILURE DUE TO QUOTES
    if(!isset($db))
    {
      require ('inc.dbc.php');
      $db = get_connection();
    }
    
    // QUERY TO VALIDATE USER
    $q = "SELECT userid, username, pwd, role 
           FROM User 
          WHERE username = '".$_POST['username']."' 
            AND pwd = '"     .md5($_POST['pwd'])."'";

    // EXECUTE THE QUERY
    $r = $db->query($q);
    $rr = $r->fetchAll();
    if(count($rr) == 1) // ASSUMES UNIQUENESS OF USERID SET IN DATABASE
    {
      //DATA RETURNED SETUP MY SESSION
      @session_start();
      $_SESSION['userid']   = $rr[0]['userid'];
      $_SESSION['role']     = $rr[0]['role'];
      
      // REDIRECT TO THE CORRECDT PORTAL
      $location = ($_SESSION['role'] == 'teacher') ? "ManageCourses.php" : "Profile.php";
      header("Location: " . $location);
    } else { // THROW ERROR
      $errors .= $errors . '<p class="alert-danger">Invalid Username/Password</p>';
    }
  }
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>TCSS445 Project Page Sign In</title>
    <link href="./css/bootstrap.min.css" rel="stylesheet">
    <link href="./css/signin.css" rel="stylesheet">
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  </head>

  <body>
<div class="container">
	<!-- BEGIN CONTENT -->
	<h2 class="text-center">Welcome to TCSS445 Project Demo!</h2>
	
	<form class="form-signin" role="form" method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
		<h4 class="form-signin-heading text-center">Please sign in</h4>
		<input type="text" class="form-control" placeholder="Username" value="<?php echo $_POST['username']; ?>" name="username" required autofocus />
		<input type="password" class="form-control" placeholder="Password" required name="pwd">
		<?php echo $errors; ?>
		<button class="btn btn-lg btn-primary btn-block" type="submit" name="login">
			Sign in
		</button>
	</form>
</div>
  
    


    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>