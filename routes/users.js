var express = require('express');
var router = express.Router();
const withAuth = require('../middlewares/routeAuth');

const {checkToken, logout, registerUser, authenticateUser, fetchUser} = require('../controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/secured', withAuth, (req, res)=>{
//   console.log(req.cookies.token[1] , 'sec');
//   res.send('Protected route')
// })

router.get('/secured', withAuth, fetchUser)


router.get('/checkToken', withAuth, checkToken);

router.get('/logout', withAuth, logout);


router.post('/register', registerUser);

router.post('/authenticate', authenticateUser);




module.exports = router;
