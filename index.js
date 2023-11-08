const express = require("express");
require("@prisma/client");
const app = express();
require("dotenv").config();
const route = require("./routes");
const bodyParser = require("body-parser");
const multer = require("multer");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function setDatabaseTimeZone() {
  try {
    await prisma.$queryRaw('SET TIME ZONE "Asia/Kolkata";');
  } catch (error) {
    console.error("Error setting database time zone:", error);
  }
}

setDatabaseTimeZone()
  .then(() => {
    console.log("Database time zone set to IST (Indian Standard Time).");
  })
  .catch((error) => {
    console.error("Error setting database time zone:", error);
  })
  .finally(() => {
    prisma.$disconnect();
  });

app.use("/", route);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
