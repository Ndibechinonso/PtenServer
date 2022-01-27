var express = require('express');
var router = express.Router();
const withAuth = require('../middlewares/routeAuth');

const {checkToken, logout, registerUser, authenticateUser} = require('../controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/secured', withAuth, (req, res)=>{
  res.send('Protected route')
})
router.get('/checkToken', withAuth, checkToken);

router.get('/logout', withAuth, logout);


router.post('/register', registerUser);

router.post('/authenticate', authenticateUser);




module.exports = router;
