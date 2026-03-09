const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const engineering = await prisma.department.upsert({
    where: { id: 1 },
    update: { name: 'Engineering' },
    create: {
      id: 1,
      name: 'Engineering',
    },
  });

  const operations = await prisma.department.upsert({
    where: { id: 2 },
    update: { name: 'Operations' },
    create: {
      id: 2,
      name: 'Operations',
    },
  });

  const usersToSeed = [
    {
      fName: 'Admin',
      lName: 'User',
      email: 'admin@taskflow.local',
      role: 'ADMIN',
      deptId: engineering.id,
      password: 'Admin123!',
    },
    {
      fName: 'Manager',
      lName: 'User',
      email: 'manager@taskflow.local',
      role: 'MANAGER',
      deptId: operations.id,
      password: 'Manager123!',
    },
    {
      fName: 'Team',
      lName: 'User',
      email: 'user@taskflow.local',
      role: 'USER',
      deptId: engineering.id,
      password: 'User123!',
    },
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

  console.log('Seed complete. Test users created/updated:');
  console.log('Admin   -> admin@taskflow.local / Admin123!');
  console.log('Manager -> manager@taskflow.local / Manager123!');
  console.log('User    -> user@taskflow.local / User123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
