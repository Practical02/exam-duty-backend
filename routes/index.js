const express = require('express');
const router = express.Router();
const auth = require('./auth');
const duty = require('./duty')
const createError = require('http-errors')
router.get('/', (req, res) => {
    res.send('Server Alive');
});
router.use('/auth', auth);
router.use('/duty', duty);

router.use( (err, req, res, next) => {
    res.status(err.status || 500).json({
        status: false,
        message: err.message
    })
})

module.exports = router;