const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const currentDate = new Date();

require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

class DutyService {
  static async create(data) {
    let duty = prisma.duty.create({
      data,
    });
    return data;
  }

  static async duties(data) {
    const { email } = data;
    const user = await prisma.user.findFirst({ where: { email: email } });
    const { id } = user;

    if (id) {
      const duties = await prisma.duty.findMany({
        where: {
          userId: id,
          date: {
            gte: currentDate,
          },
        },
      });
      const ISTOffset = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
      const dutiesWithOffset = duties.map((duty) => ({
        ...duty,
        date: new Date(duty.date.getTime() + ISTOffset),
      }));

      console.log(dutiesWithOffset);
      return dutiesWithOffset;
    } else {
      throw new Error("No email provided in the data object.");
    }
  }
}

module.exports = DutyService;
