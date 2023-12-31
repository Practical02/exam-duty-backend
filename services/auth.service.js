const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

class AuthService {
  static async register(data) {
    // data.password = bcrypt.hashSync(data.password, 8);
    let user = prisma.user.create({
      data,
    });
    data.accessToken = await jwt.signAccessToken(user);

    return data;
  }
  static async login(data) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("User not registered");
    }
    // const checkPassword = bcrypt.compareSync(password, user.password);
    // if (!checkPassword) {
    //   throw new Error("Email address or password not valid");
    // }
    // delete user.password;
    const accessToken = await jwt.signAccessToken(user);
    return { ...user, accessToken };
  }
  static async all() {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }
}

module.exports = AuthService;
