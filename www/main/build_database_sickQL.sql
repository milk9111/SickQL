USE connorl2;

-- Create Patient table
DROP TABLE IF EXISTS Patient;
CREATE TABLE Patient (
  email     VARCHAR(32) PRIMARY KEY,
  userName  VARCHAR(32) UNIQUE NOT NULL,
  password  CHAR(32) NOT NULL,
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
  email     VARCHAR(32) PRIMARY KEY,
  userName  VARCHAR(32) UNIQUE NOT NULL,
  password  VARCHAR(32) NOT NULL
);

-- Add Doctors to table
INSERT INTO Doctor VALUES
  ('drHalsey@unscONI.gov', 'Catherine Elizabeth Halsey', 'Lucky7')
, ('iamguilty@gmail.com', 'Guilty Spark', '343forerunner');

-- Create Table for Prescriptions
DROP TABLE IF EXISTS Prescription;
CREATE TABLE Prescription (
  presId        VARCHAR(32) PRIMARY KEY,
  namePre       VARCHAR(32) UNIQUE NOT NULL,
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
  patientEmail VARCHAR(32) NOT NULL,
  doctorEmail  VARCHAR(32) NOT NULL,
  active       int,
  PRIMARY KEY(patientEmail, doctorEmail)
);