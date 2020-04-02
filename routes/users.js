var express = require('express');
var router = express.Router();
const checkAuth =require('../middleware/checkAuth');

const userController =require('../controllers/User');
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.post('/login', userController.Login);

router.all("*", checkAuth);

router.get('/',userController.List)
      .post('/',userController.Insert)
      .put('/',userController.Update)
      .delete('/', userController.Delete);

 router.post('/logSettings', userController.LogSettings);

module.exports = router;
