import { PrismaClient, Role, Status } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Insert Users
    await prisma.user.createMany({
        data: [
            { user_id: '1', email: 'jamin.panda0@gmail.com', password: 'password', first_name: 'Jamin', last_name: 'Panda', role: 'Admin' },
            { user_id: '2', email: 'davidpal3c@gmail.com', password: 'password', first_name: 'David', last_name: 'P', role: 'Student' },
            { user_id: '3', email: 'david.palacios023@gmail.com', password: 'password', first_name: 'alumniFirstName', last_name: 'alumniLastName', role: 'Alumni' },
            { user_id: '4', email: 'apratt1@mtroyal.ca', password: 'password', first_name: 'Aidan', last_name: 'Pratt', role: 'Admin' },
            { user_id: '5', email: 'jnovaalfonso@gmail.com', password: 'password', first_name: 'Juan', last_name: 'Nova', role: 'Admin' },
            { user_id: '6', email: 'cca20250108@gmail.com', password: 'password', first_name: 'Test', last_name: 'User', role: 'Student' },
            { user_id: '7', email: 'summer15638@gmail.com', password: 'password', first_name: 'Jaeeun', last_name: '1', role: 'Admin' },
            { user_id: '8', email: 'winter15638@gmail.com', password: 'password', first_name: 'Jaeeun', last_name: '2', role: 'Student' },
            { user_id: '9', email: 'ap972001@gmail.com', password: 'password', first_name: 'Aidan', last_name: '2', role: 'Student' },
            { user_id: '10', email: 'aidanpkey@gmail.com', password: 'password', first_name: 'Aidan', last_name: '3', role: 'Alumni' },
        ],
    });

    // Insert Departments
    await prisma.department.createMany({
        data: [
            { department_id: 'SADT630', name: 'School of Advanced Digital Technology', contact_email: 'sadt.admin@edu.sait.edu', contact_phone: '123-456-7890' },
            { department_id: 'SADT420', name: 'School of Business', contact_email: 'sob.admin@edu.sait.edu', contact_phone: '123-456-7890' },
        ],
    });

    // Insert Programs
    await prisma.program.createMany({
        data: [
            { program_id: 'SADT-009', name: 'Software Development', department_id: 'SADT630' },
            { program_id: 'SADT-012', name: 'Business Administration Diploma', department_id: 'SADT420' },
        ],
    });

    // Insert Admins
    await prisma.admin.createMany({
        data: [
            { user_id: '1', permissions: 'Full Access' },
            { user_id: '4', permissions: 'Full Access' },
            { user_id: '5', permissions: 'Full Access' },
            { user_id: '7', permissions: 'Full Access' },
        ],
    });

    // Insert Students
    await prisma.student.createMany({
        data: [
            { user_id: '2', program_id: 'SADT-009', status: 'Active' },
            { user_id: '6', program_id: 'SADT-009', status: 'Active' },
            { user_id: '8', program_id: 'SADT-012', status: 'Active' },
            { user_id: '9', program_id: 'SADT-012', status: 'Active' },
        ],
    });

    // Insert Alumni
    await prisma.alumni.createMany({
        data: [
            { user_id: '3', graduation_year: 2021, credentials: 'Bachelor in Geographic Information Systems', current_position: 'Software Engineer', company: 'GeoTech' },
            { user_id: '10', graduation_year: 2021, credentials: 'Bachelor in Power Engineering', current_position: 'Operations Engineer', company: 'TC Energy' },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });