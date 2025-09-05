const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Seed a department first if not exists
  const department = await prisma.department.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Engineering',
    },
  });

  // Hash the password
  const hashedPassword = await bcrypt.hash('test123', 10);

  // Seed initial admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'zoro@company.com' },
    update: {}, // do nothing if user exists
    create: {
      fName: 'Roronoa',
      lName: 'Zoro',
      email: 'zoro@company.com',
      password: hashedPassword,
      role: 'ADMIN', // make it ADMIN
      deptId: department.id,
    },
  });

  console.log('✅ Seeder finished:', adminUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
