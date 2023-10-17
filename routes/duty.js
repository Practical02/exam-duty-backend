const router = require('express').Router();
const duty = require('../controllers/duty.controller');
const auth = require("../middlewares/auth");

router.post("/", auth, duty.create);

router.post("/duties", auth, duty.duties);

module.exports = router;
