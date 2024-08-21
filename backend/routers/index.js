require('dotenv').config();
const certificateRouter = require('./Certificate');
const authRouter = require('./Auth');
const router = require('express').Router();

router.use('/auth', authRouter);
router.use('/certificates', certificateRouter);

module.exports = router;