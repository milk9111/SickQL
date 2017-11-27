<?php 
if(!isset($_SESSION)){
    session_start();
}

// SET $page_type = 'student','teacher','public'
$page_type = 'student';
require('inc.header.php');

if(!isset($db))
{
  require ('inc.dbc.php');
  $db = get_connection();
}

// HANDLE ENROLLMENT FORM
$message = '';
if(isset($_POST['enroll']))
{
  $updateq = $db->prepare('INSERT INTO Registration (course_number,student_id) VALUES (:course , :uid)');
  if($updateq->execute(array(':course' => $_POST['course'], ':uid' => $_SESSION['userid'])))
  {
    $message = '<p class="alert-success">Enrolled Successfully in ' . $_POST['course'] . '!!!</p>';
  } else { // THERE WAS AN ERROR!
    $message = '<p class="alert-warning">There was an issue</p>.';
  }
}


// HANDLE DELETE ACTION
if(isset($_GET['action']))
{
  // MAKE SURE THE SESSION USER IS THE SAME AS THE USER REQUEST.
  if($_GET['uid'] == $_SESSION['userid'])
  {
    $remove = $db->prepare('DELETE FROM Registration WHERE course_number = :course AND student_id = :uid');
    if($remove->execute(array(':course' => $_GET['cn'], ':uid' => $_SESSION['userid'])))
    {
      echo $_GET['cn'];
      $message = '<p class="alert-success">Successfully Unenrolled from course.</p>';
    } else {
      $message = '<p class="alert-warning">Error removing course.  Try agian later.</p>';
    }
    
  } else {
    $message = '<p class="alert-warning">Unable to take the desired action</p>';
  }
  
}


// DRAW THE LIST OF COURSES THE STUDENT IS ENROLLED IN
$c = $db->prepare('SELECT course_number FROM Registration WHERE student_id = :uid');
$c->execute(array(':uid' => $_SESSION['userid']));

$c_res = $c->fetchAll();
if (count($c_res) > 0)
{  // THERE ARE COURSES, DRAW THE FORM
  $course_list = '<table class="table table-striped"><thead><tr><th>CourseNumber</th><th>Action</th></tr></thead><tbody>';
  foreach($c_res as $course)
  {
    $course_list .= '<tr><td>' . $course['course_number'] . '</td>';
    $course_list .= '<td><a href="' . $_SERVER['PHP_SELF'] . '?action=del&cn='.$course['course_number'] . '&uid='.$_SESSION['userid'].'">Delete</a></td></tr>';
  }
  
  $course_list .= "</table>";
} else {
  $course_list = '<p class="alert-warning">You are not registered for anything.  Enroll Below</p>';
}


// DRAW THE ENROLLMENT FORM
$courses = $db->prepare('SELECT C.course_number FROM Course C WHERE C.is_active = 1
                  AND NOT EXISTS (SELECT R.course_number FROM Registration R 
                           WHERE R.course_number = C.course_number
                             AND R.student_id = :uid )');
$courses->execute(array(':uid'   => $_SESSION['userid']));

$c_res = $courses->fetchAll();


// GET ACTIVE ENROLLMENT INFORMATION
if (count($c_res) > 0)
{
  // BUILD THE DROPDOWN LIST 
  $enroll_form = '<form role="form" method="POST" action="'. $_SERVER['PHP_SELF']. '"><div class="form-group">Choose a course to enroll:<br><select class="form-control" name="course">';
  foreach ($c_res as $course)
    $enroll_form .= "<option>".$course['course_number']."</option>";
  
  $enroll_form .= '</select><button class="btn btn-lg btn-primary" type="submit" name="enroll">Enroll</button>';
  
} else {
  $enroll_form = '<p class="alert-warning">There are no available courses.  Try again later</p>';
}


?>
 
<body>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h2 class="panel-title">Welcome to TSS445 Project Demo</h2>
    </div>
    <div class="panel-body">
      This mini project leverages Bootstrap 3.3.7 for HTML/CSS/JS, PHP7 and MariaDB 10.1.20
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-sm-4">
        <ul class="nav nav-pills nav-stacked">
<!--  ************************** -->
<!--  SET NAVIGATION ACTIVE HERE -->
<!--  ************************** -->
          <li role="presentation" class="inactive">  <a href="Profile.php">Profile</a></li>
          <li role="presentation" class="active">    <a href="ManageStudentEnrollment.php">Manage Enrollment</a></li>
          <li role="presentation" class="inactive">  <a href="ContactTeacher.php">Contact Teacher</a></li>
          <li role="presentation" class="inactive">  <a href="Logout.php">Logout</a></li>
        
          </ul>	   
      </div>
      <div class="col-sm-8">
        <div class="panel panel-default">
          <div class="panel-heading">Welcome, <?php echo $name; ?>.  Update your registration below.</div>
            <div class="panel-body">
               <?php echo $course_list; ?>
               <hr>
               <?php echo $message; ?>
               <?php echo $enroll_form; ?>
            </div>
          </div>
        </div>
      </div>
 </div>
 <?php include("./inc.footer.php");?>
 
