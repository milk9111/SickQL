USE <uwnetid>;  -- CHANGE THIS TO YOUR DATABASE

SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  userid         int(11) PRIMARY KEY,
  username       varchar(32) UNIQUE NOT NULL,
  pwd            CHAR(32) NOT NULL,
  preferred_name varchar(150),
  role           varchar(10) NOT NULL,
  email          varchar(256),
  last_login     datetime
);

  -- INSERT THE DEFAULT USERS
INSERT INTO `User` VALUES
  (1,'student','5f4dcc3b5aa765d61d8327deb882cf99','Joe Student' ,'student', NULL, NULL)
, (2,'teacher','5f4dcc3b5aa765d61d8327deb882cf99','Jane Teacher','teacher', NULL, NULL);

DROP TABLE IF EXISTS Course;
CREATE TABLE Course (
    course_number CHAR(8) PRIMARY KEY
  , teacher_id   int(11)
  , is_active    bool
);

INSERT INTO Course VALUES
  ('TCSS445',2,1)
, ('TCSS123',2,0);



DROP TABLE IF EXISTS Registration;
CREATE TABLE Registration (
    course_number CHAR(8)
  , student_id    int(11)
  , PRIMARY KEY(course_number, student_id)
);

SET foreign_key_checks = 0;
