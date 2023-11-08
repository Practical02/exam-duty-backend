const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanDutyTable() {
  try {
    await prisma.duty.deleteMany({}); // Delete all records from the 'duty' table
    console.log('Duty table cleaned.');
  } catch (error) {
    console.error('Error cleaning the duty table:', error);
  } finally {
    prisma.$disconnect();
  }
}

cleanDutyTable().catch((error) => {
  console.error('Error cleaning the duty table:', error);
  prisma.$disconnect();
});
