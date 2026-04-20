const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Create Departments
  const departments = [
    { id: 1, name: 'Intelligence & Strategy' },
    { id: 2, name: 'Operational Security' },
    { id: 3, name: 'Archival Engineering' },
    { id: 4, name: 'Field Communications' }
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { id: dept.id },
      update: { name: dept.name },
      create: { id: dept.id, name: dept.name },
    });
  }

  const engineering = departments[2];
  const operations = departments[1];
  const intelligence = departments[0];

  const usersToSeed = [
    {
      fName: 'Alexander',
      lName: 'Vance',
      email: 'admin@taskflow.io',
      role: 'ADMIN',
      deptId: intelligence.id,
      password: 'Admin123!',
    },
    {
      fName: 'Sarah',
      lName: 'Connor',
      email: 'manager@taskflow.io',
      role: 'MANAGER',
      deptId: operations.id,
      password: 'Manager123!',
    },
    {
      fName: 'Gordon',
      lName: 'Freeman',
      email: 'agent@taskflow.io',
      role: 'USER',
      deptId: engineering.id,
      password: 'User123!',
    },
    {
      fName: 'Elena',
      lName: 'Fisher',
      email: 'elena@taskflow.io',
      role: 'USER',
      deptId: departments[3].id,
      password: 'User123!',
    },
    {
      fName: 'Victor',
      lName: 'Sullivan',
      email: 'sully@taskflow.io',
      role: 'MANAGER',
      deptId: intelligence.id,
      password: 'Manager123!',
    }
  ];

  for (const seedUser of usersToSeed) {
    const hashedPassword = await bcrypt.hash(seedUser.password, 10);

    await prisma.user.upsert({
      where: { email: seedUser.email },
      update: {
        fName: seedUser.fName,
        lName: seedUser.lName,
        role: seedUser.role,
        deptId: seedUser.deptId,
        password: hashedPassword,
      },
      create: {
        fName: seedUser.fName,
        lName: seedUser.lName,
        email: seedUser.email,
        password: hashedPassword,
        role: seedUser.role,
        deptId: seedUser.deptId,
      },
    });
  }

  console.log('Seed complete. Neo-Vintage agents provisioned:');
  console.log('-------------------------------------------');
  console.log('Alexander (Admin)  -> admin@taskflow.io / Admin123!');
  console.log('Sarah (Manager)    -> manager@taskflow.io / Manager123!');
  console.log('Gordon (Agent)     -> agent@taskflow.io / User123!');
  console.log('Elena (Agent)      -> elena@taskflow.io / User123!');
  console.log('Sullivan (Manager) -> sully@taskflow.io / Manager123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
