const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csv = require('csv-parser');

const prisma = new PrismaClient();

async function seedDatabase() {
  const csvFilePath = 'utils/users.csv';

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
      // Assuming you have a Prisma model named 'YourModelName'
      await prisma.user.create({
        data: {
          // Map your CSV columns to model fields
          name: row.name,
          email: row.email,
          // Add more fields as needed
        },
      });
    })
    .on('end', () => {
      console.log('CSV file successfully seeded into the database.');
      prisma.$disconnect();
    });
}

seedDatabase().catch((error) => {
  console.error('Error seeding the database:', error);
  prisma.$disconnect();
});