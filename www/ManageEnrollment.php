<?php 
if(!isset($_SESSION)){
    session_start();
}

// SET $page_type = 'student','teacher','public'
$page_type = 'teacher';
require('inc.header.php');

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
          <li role="presentation" class="inactive"><a href="TeacherProfile.php">Profile</a></li>
          <li role="presentation" class="inactive">  <a href="ManageCourses.php">Manage Courses</a></li>
          <li role="presentation" class="active"><a href="ManageEnrollment.php">Manage Enrollment</a></li>
          <li role="presentation" class="inactive"><a href="Logout.php">Logout</a></li>
                  </ul>	   
      </div>
      <div class="col-sm-8">
        <div class="panel panel-default">
          <div class="panel-heading">Welcome, <?php echo $name; ?>.  Update your registration below.</div>
          <div class="panel-body">
             This is some text that is going to go into the panel body
             <hr>
             This is some info below that line.
          </div>        
        </div>
      </div>
    </div>
 </div>
 <?php include("./inc.footer.php");?>
 
