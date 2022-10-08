var express = require('express');
var router = express.Router();
const controllers = require('../controllers/apiControllers')
const restrict = require('../middlewares/restrict')

/* GET home page. */
router.get('/', controllers.dashboard)
router.post('/v1/login',controllers.login)
router.get('/v1/login/whoami', restrict ,controllers.whoami)

module.exports = router;
