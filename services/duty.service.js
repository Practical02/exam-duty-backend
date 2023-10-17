const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
    const {id} = user;

    if (id) {
      const duties = await prisma.duty.findMany({
        where: { userId: id },
      });
      console.log(duties);
      return duties;
      
    } else {
      throw new Error("No email provided in the data object.");
    }
  }
}

module.exports = DutyService;
