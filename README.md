Group E aka "SickQL"
Morgan Blackmore,
Brandon Blaschke,
Connor Lundberg,

**An application that allows patients to keep up to date on their basic medical information and prescriptions. 
This was made as the final project for TCSS445 Database Design.**


DrHome.html - user interface for Dr 
drHome.js - creates and displays dynamic table data for Dr home page
DrHome.php - queries db to get info for this Dr

PatientHome.html - user interface for Patient 
patientHome.js - creates and displays dynamic table data for patient home page

addPrescription.html - user interface for Dr to add prescription to patient
addPrescription.js - creates and displays dynamic table data for addPrescription page
addPrescription.php - queries db to add prescription to this patient

home.html - user interface for home/login page

register.html - user interface to create a new user
register.php - queries db to add new user data

updatePatient.html - user interface for Dr to update patient info
updatePatient.js - creates and displays dynamic table data for updatePatient page
updatePatient.php - queries db to alter patient info

userHandling.js - Checks that the Username and Password follow the correct formats. If so, then send to backend to verify account existence and correctness.

addDoctor.php - queries db to add Dr to patient

getAvailableDoctors.php - queries db to get available Dr's to display in Patient home

getDoctorsForPatient.php - queries db to get Dr's attached to this patient

getPatientsForDoctor.php - queries db to get patients attached to this Dr

getYourInformation.php - queries db to get patient data for this patient

getYourPrescriptions.php - queries db to get prescriptions for this patient

inc.dbc.php - holds db host, name, pword

login.php - queries db for the login info for user to login 

removeDoctor.php - queries db to remove Dr from this patient

removePatient.php - queries db to remove patient from this Dr
