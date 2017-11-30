USE connorl2;

-- Create Patient table
DROP TABLE IF EXISTS Patient;
CREATE TABLE Patient (
  username  VARCHAR(32) PRIMARY KEY,
  fullname  VARCHAR(32) NOT NULL,
  password  VARCHAR(32) NOT NULL,
  height    FLOAT(6),
  weight    FLOAT(8),
  age       int
);

-- Insert User Patients
INSERT INTO Patient VALUES
  ('john117@gmail.com', 'John Chief', 'Halo07', 6.11, 220.25, 30)
, ('cortona@hotmail.com', 'Cortona', 'IamHuman', 5.3, 120.5, 7)
, ('johnsonSgt@yahoo.com', 'Avery Johnson', 'SendMeOutWithABang', NULL, NULL, 60)
, ('valdezAutumn@yahoo.com', 'Valdez', 'PillarOfAutun', NULL, NULL, 25);

-- Create Doctor table
DROP TABLE IF EXISTS Doctor;
CREATE TABLE Doctor (
  username  VARCHAR(32) PRIMARY KEY,
  fullname  VARCHAR(32) NOT NULL,
  password  VARCHAR(32) NOT NULL
);

-- Add Doctors to table
INSERT INTO Doctor VALUES
  ('connor', 'Connor', 'tests')
, ('drHalsey@unscONI.gov', 'Catherine Elizabeth Halsey', 'Lucky7')
, ('iamguilty@gmail.com', 'Guilty Spark', '343forerunner');

-- Create Table for Prescriptions
DROP TABLE IF EXISTS Prescription;
CREATE TABLE Prescription (
  presId        VARCHAR(32) PRIMARY KEY,
  namePre       VARCHAR(32) NOT NULL,
  dose          VARCHAR(32) NOT NULL,
  cost          FLOAT(6) NOT NULL,
  frequency     int NOT NULL,
  refillDate    VARCHAR(32) NOT NULL,
  manufacturer  VARCHAR(32),
  active        int
);

-- Create table for multiway relationship for doctors and patients
DROP TABLE IF EXISTS AssignTo;
CREATE TABLE AssignTo (
  patientUsername VARCHAR(32) NOT NULL,
  doctorUsername VARCHAR(32) NOT NULL,
  active       int,
  PRIMARY KEY(patientUsername, doctorUsername)
);


-- Add pairs
INSERT INTO AssignTo VALUES
  ('cortona@hotmail.com', 'drHalsey@unscONI.gov', 1),
  ('cortona@hotmail.com', 'iamguilty@gmail.com', 1),
  ('valdezAutumn@yahoo.com', 'iamguilty@gmail.com', 1),
  ('john117@gmail.com', 'connor', 1);