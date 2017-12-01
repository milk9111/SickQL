USE connorl2;

-- Create Patient table
DROP TABLE IF EXISTS Patient;
CREATE TABLE Patient (
  username  VARCHAR(32) PRIMARY KEY,
  fullname  VARCHAR(32) NOT NULL,
  password  VARCHAR(32) NOT NULL,
  height    FLOAT(6) NOT NULL,
  weight    FLOAT(8) NOT NULL,
  age       int NOT NULL
);

-- Insert User Patients
INSERT INTO Patient (username, fullname, password, height, weight, age) VALUES
  ('john117@gmail.com', 'John Chief', 'Halo07', 6.11, 220.25, 30)
, ('cortona@hotmail.com', 'Cortona', 'IamHuman', 5.3, 120.5, 7)
, ('johnsonSgt@yahoo.com', 'Avery Johnson', 'SendMeOutWithABang', 0, 0, 60)
, ('valdezAutumn@yahoo.com', 'Valdez', 'PillarOfAutun', 0, 0, 25);

-- Create Doctor table
DROP TABLE IF EXISTS Doctor;
CREATE TABLE Doctor (
  username  VARCHAR(32) PRIMARY KEY,
  fullname  VARCHAR(32) NOT NULL,
  password  VARCHAR(32) NOT NULL
);

-- Add Doctors to table
INSERT INTO Doctor (username, fullname, password) VALUES
  ('connor', 'Connor', 'tests')
, ('drHalsey@unscONI.gov', 'Catherine Elizabeth Halsey', 'Lucky7')
, ('iamguilty@gmail.com', 'Guilty Spark', '343forerunner');

-- Create Table for Prescriptions
DROP TABLE IF EXISTS Prescription;
CREATE TABLE Prescription (
  presID        INT AUTO_INCREMENT,
  patientUsername VARCHAR(32) NOT NULL,
  namePre       VARCHAR(32) NOT NULL,
  dose          VARCHAR(32) NOT NULL,
  cost          FLOAT(6) NOT NULL,
  frequency     int NOT NULL,
  refillDate    VARCHAR(32) NOT NULL,
  manufacturer  VARCHAR(32),
  active        int,
  PRIMARY KEY (presID)
);

INSERT INTO Prescription (patientUsername, namePre, dose, cost, frequency, refillDate, manufacturer, active) VALUES
  ('cortona@hotmail.com', 'Xanax', '1mg', 390.11, 3, '2/30/2018', 'Pfizer Inc.', 1),
  ('cortona@hotmail.com', 'Vicodin', '300mg', 168.87, 4, '1/08/2018', 'Abbott labs', 0),
  ('john117@gmail.com', 'Actos', '15mg', 226.0, 1, '1/15/2018', 'Takeda Pharmaceuticals', 1),
  ('johnsonSgt@yahoo.com', 'Esomeprazole', '15mL', 320.56, 3, '12/26/2017', 'Akorn Inc.', 1);

-- Create table for multiway relationship for doctors and patients
DROP TABLE IF EXISTS AssignTo;
CREATE TABLE AssignTo (
  patientUsername VARCHAR(32) NOT NULL,
  doctorUsername VARCHAR(32) NOT NULL,
  active       int,
  PRIMARY KEY(patientUsername, doctorUsername)
);


-- Add pairs
INSERT INTO AssignTo (patientUsername, doctorUsername, active) VALUES
  ('cortona@hotmail.com', 'drHalsey@unscONI.gov', 1),
  ('cortona@hotmail.com', 'iamguilty@gmail.com', 1),
  ('valdezAutumn@yahoo.com', 'iamguilty@gmail.com', 1),
  ('john117@gmail.com', 'connor', 1);