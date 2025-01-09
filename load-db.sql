-- Insert Users
INSERT INTO "User" (user_id, email, password, first_name, last_name, role, created_at, updated_at)
VALUES
    ('1', 'jamin.panda0@gmail.com', 'password', 'Jamin', 'Panda', 'Admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('2', 'davidpal3c@gmail.com', 'password', 'David', 'P', 'Student', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('3', 'david.palacios023@gmail.com', 'password', 'alumniFirstName', 'alumniLastName', 'Alumni', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('4', 'apratt1@mtroyal.ca', 'password', 'Aidan', 'Pratt', 'Admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('5', 'jnovaalfonso@gmail.com', 'password', 'Juan', 'Nova', 'Admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('6', 'cca20250108@gmail.com', 'password', 'Test', 'User', 'Student', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Department
INSERT INTO "Department" (department_id, name, contact_email, contact_phone)
VALUES ('SADT630', 'School of Advanced Digital Technology', 'sadt.admin@edu.sait.edu', '123-456-7890');

-- Insert Program
INSERT INTO "Program" (program_id, name, department_id)
VALUES ('SADT-009', 'Software Development', 'SADT630');


-- Insert Admin records
INSERT INTO "Admin" (user_id, permissions)
VALUES 
    ('1', 'Full Access'), 
    ('4', 'Full Access'),
    ('5', 'Full Access');

-- Insert Student records
INSERT INTO "Student" (user_id, program_id, status)
VALUES 
    ('2', 'SADT-009', 'Active'),
    ('6', 'SADT-009', 'Active');

-- Insert Alumni record
INSERT INTO "Alumni" (user_id, graduation_year, credentials, current_position, company)
VALUES ('3', 2021, 'Bachelor in Geographic Information Systems', 'Software Engineer', 'GeoTech');


select * from "User" where user_id = '6';