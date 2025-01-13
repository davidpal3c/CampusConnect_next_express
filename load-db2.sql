-- Insert Users
INSERT INTO "User" (user_id, email, password, first_name, last_name, role, created_at, updated_at)
VALUES
    ('7', 'summer15638@gmail.com', 'password', 'Jaeeun', '1', 'Admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('8', 'winter15638@gmail.com', 'password', 'Jaeeun', '2', 'Student', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('9', 'ap972001@gmail.com', 'password', 'Aidan', '2', 'Student', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('10', 'aidanpkey@gmail.com', 'password', 'Aidan', '3', 'Alumni', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Insert Department
INSERT INTO "Department" (department_id, name, contact_email, contact_phone)
VALUES ('SADT420', 'School of Business', 'sob.admin@edu.sait.edu', '123-456-7890');

-- Insert Program
INSERT INTO "Program" (program_id, name, department_id)
VALUES ('SADT-012', 'Business Administration Diploma', 'SADT420');


-- Insert Admin records
INSERT INTO "Admin" (user_id, permissions)
VALUES 
    ('7', 'Full Access');


-- Insert Student records
INSERT INTO "Student" (user_id, program_id, status)
VALUES 
    ('8', 'SADT-012', 'Active'),
    ('9', 'SADT-012', 'Active');

-- Insert Alumni record
INSERT INTO "Alumni" (user_id, graduation_year, credentials, current_position, company)
VALUES ('10', 2021, 'Bachelor in Power Engineering', 'Operations Engineer', 'TC Energy');


