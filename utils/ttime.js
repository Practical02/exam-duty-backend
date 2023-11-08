const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Set the time zone for the current session to IST (Indian Standard Time)
async function setDatabaseTimeZone() {
  try {
    await prisma.$executeRaw`SET TIME ZONE 'Asia/Kolkata';`;
  } catch (error) {
    console.error('Error setting database time zone:', error);
  }
}

setDatabaseTimeZone()
  .then(() => {
    console.log('Database time zone set to IST (Indian Standard Time).');
  })
  .catch((error) => {
    console.error('Error setting database time zone:', error);
  })
  .finally(() => {
    prisma.$disconnect();
  });

// Your other Express.js routes and code here
