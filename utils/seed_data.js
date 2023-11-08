const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csv = require('csv-parser');

const prisma = new PrismaClient();

async function seedDatabase() {
  const csvFilePath = 'utils/merged_data.csv';

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
      try {
        const email = row.email;
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          console.error(`User with email ${email} not found.`);
          return;
        }

        // Iterate through the dates and check for 'M' values
        for (const [date, value] of Object.entries(row)) {
          if (date !== 'email' && value === 'M') {
            await prisma.duty.create({
              data: {
                userId: user.id,
                date: new Date(date),
              },
            });
          }
        }
      } catch (error) {
        console.error('Error creating user or duty:', error);
      }
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
