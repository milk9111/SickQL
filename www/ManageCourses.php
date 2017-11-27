<?php 
if(!isset($_SESSION)){
    session_start();
}

// SET $page_type = 'student','teacher','public'
$page_type = 'teacher';
require('inc.header.php');

if(!isset($db))
{
  require('inc.dbc.php');
    $db = get_connection();
}

# BUILD QUERY
$q = 'SELECT userid, username, preferred_name, email
       FROM User
      WHERE userid = ' . $_SESSION['userid'];

$r = $db->query($q);

$row = $r->fetch(); // GET A SINGLE ROW

$username = $row['username'];
$userid   = $row['userid'];
$name     = $row['preferred_name'];
$email    = $row['email'];



// HANDLE UPDATES TO COURSES USING POST
if(isset($_POST['submit']))
{
  if(strlen($_POST['course']) > 8 || strlen($_POST['course']) == 0)
  {
    $new_message = '<p class="alert-danger">Course number invalid: ' . $_POST['course'] . '</p>';
   
  } else {
    $new_message = '<p class="alert-success">Trying to do something here</p>'; 
    $is_active = ($_POST['submit'] == 'active') ? 1 : 0;
    
    $new = $db->prepare("INSERT INTO Course (course_number, teacher_id, is_active) VALUES (:course, :teacher_id, :act)");
    if($new->execute(array(':course' => $_POST['course'], ':teacher_id' => $_SESSION['userid'], ':act' => $is_active)))
    {
      $new_message = '<p class="alert-success">Successfully added '. $_POST['course'] .'</p>' ; 
     } else {
       $new_message = '<p class="alert-warning">Failed to insert, possibly a course already exists with that number</p>';
     }
  }
}

// HANDLE NEW COURSES USING POST
if(isset($_GET['action']))
{
    // MAKE SURE THE SESSION USER IS THE SAME AS THE USER REQUEST.
    if($_GET['uid'] == $_SESSION['userid'])
    {
      
      switch ($_GET['action']) {
      case 'deactivate':
        $q = $db->prepare("UPDATE Course SET is_active = 0 WHERE course_number = :course");
        if($q->execute(array(':course'=>$_GET['cn'])))
          $mod_message = '<p class="alert-success">Course deactivated.</p>';
        break;
      case 'activate':
        $q = $db->prepare("UPDATE Course SET is_active = 1 WHERE course_number = :course");
        if($q->execute(array(':course'=>$_GET['cn'])))
          $mod_message = '<p class="alert-success">Course activated.</p>';
        break;
      case 'delete':
        // TWO THINGS NEEDED HERE, NEED TO CLEAR ALL REGISTRATIONS BEFORE DELETING THE COURSE
        $reg = $db->prepare("DELETE FROM Registration WHERE course_number = :course");
        if($reg->execute(array(':course'=> $_GET['cn']))) {
          $mod_message .= '<p class="alert-success">' . $reg->rowCount() . ' student(s) successfully removed from course';
        }
        $q = $db->prepare("DELETE FROM Course WHERE course_number = :course");
        if($q->execute(array(':course'=> $_GET['cn'])))
          $mod_message .=  '<p class="alert-success">Course successfully deleted</p>';
        break;
      default:
        $mod_message = '<p class="alert-warning">Unable to perform the requested action: '.$_GET['action'].'</p>';
        break;
      }
    } else {
      $mod_message = '<p class="alert-warning">Unable to perform the requested action.</p>';
    }    
}







// DRAW THE FORMS
$c = $db->prepare('SELECT C.course_number, C.is_active, count(R.course_number) as Students
                     FROM Course C LEFT OUTER JOIN Registration R 
                       ON C.course_number = R.course_number  
                    WHERE teacher_id = :uid
                   GROUP BY C.course_number, C.is_active' );

$c->execute(array(':uid' => $_SESSION['userid']));

if ($c->rowCount() > 0)
{  // THERE ARE COURSES, DRAW THE FORM
$course_list = '<table class="table table-striped"><thead><tr><th>CourseNumber</th><th># Students</th><th>Activation</th><th>Remove</th></tr></thead><tbody>';
foreach($c as $course)
{
  $course_list .= '<tr><td>' . $course['course_number'] . '</td><td>'.$course['Students']. '</td>';
  if ($course['is_active'] == 1)
    $course_list .= '<td><a href="' . $_SERVER['PHP_SELF'] . '?action=deactivate&cn='.$course['course_number'].'&uid='.$_SESSION['userid'].'">Deactivate</td>';
  else
    $course_list .= '<td><a href="' . $_SERVER['PHP_SELF'] . '?action=activate&cn='.$course['course_number'].'&uid='.$_SESSION['userid'].'">Activate</td>';
  
 $course_list .= '<td><a href="' . $_SERVER['PHP_SELF'] . '?action=delete&cn='.$course['course_number'].'&uid='.$_SESSION['userid'].'">Delete</td></tr>';
    
}

$course_list .= "</tbody></table>";
} else {
  $course_list = '<p class="alert-warning">There are no courses.  Add one below.</p>';
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
          <li role="presentation" class="inactive"><a href="TeacherProfile.php">Profile</a></li>
          <li role="presentation" class="active">  <a href="ManageCourses.php">Manage Courses</a></li>
          <li role="presentation" class="inactive"><a href="ManageEnrollment.php">Manage Enrollment</a></li>
          <li role="presentation" class="inactive"><a href="Logout.php">Logout</a></li>
        </ul>	   
      </div>
      <div class="col-sm-8">
        <div class="panel panel-default">
          <div class="panel-heading">Welcome, <?php echo $name; ?>.  Update Courses Below</div>
            <div class="panel-body">
              <?php echo $mod_message; ?>
              <?php echo $course_list; ?>
               <hr>
                <form role="form" method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                  <div class="form-group">
                    Type a new course number to enroll.  Course numbers cannot be more than 8 characters long.
                    <input type="text" placeholder="enter course number" name="course" class="form-control" />
                    <button class="form-group btn btn-lg btn-primary" type="submit" name="submit" value="active">CREATE AND ACTIVATE</button>
                    <button class="form-group btn btn-lg" type="submit" name="submit" value="inactive">Create as inactive</button>
                    <?php echo $new_message; ?>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
 </div>
 <?php include("./inc.footer.php");?>
 

 