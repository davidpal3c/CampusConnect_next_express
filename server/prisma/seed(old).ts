import { PrismaClient, Role, Status } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create a department
  const department = await prisma.department.create({
    data: {
      department_id: 'SADT630',
      name: 'School of Advanced Digital Technology',
      contact_email: 'sadt.admin@edu.sait.edu',
      contact_phone: '123-456-7890',
    },
  });

  // Create a program within that department
  const program = await prisma.program.create({
    data: {
      program_id: 'SADT-009',
      name: 'Software Development',
      department_id: department.department_id, 
    },
  });

  // Create an admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'jamin.panda0@gmail.com',
      password: 'securepassword',           // ensure hashing in production
      first_name: 'AdminUser1',
      last_name: 'UserLastName1',
      role: Role.Admin,
      Admin: {
        create: {
          permissions: 'Full Access',
        },
      },
    },
  });

  // Create a student user
  const studentUser = await prisma.user.create({
    data: {
      email: 'davidpal3c@gmail.com',
      password: 'anothersecurepassword', 
      first_name: 'David',
      last_name: 'P',
      role: Role.Student,
      Student: {
        create: {
          program_id: program.program_id, 
          status: Status.Active,
        },
      },
    },
  });

  // Create an alumni user
  const alumniUser = await prisma.user.create({
    data: {
      email: 'david.palacios023@gmail.com',
      password: 'anothersecurepassword2', 
      first_name: 'alumniFirstName',
      last_name: 'alumniLastName',
      role: Role.Alumni,
      Alumni: {
        create: {
          graduation_year: 2020,
          credentials: 'Bachelor of Technology in Geographic Information Systems',
          current_position: 'Software Engineer',
          company: 'GeoTech',
        },
      },
    },
  });

  console.log('Data successfully created!');
}

main()
  .catch((e) => {
    console.error(e);
    // process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });