var userController = require('./userController.js');


module.exports = function (app) {
	console.log("here I am")
  app.post('/customer/post/signin', userController.signin);
  app.post('/customer/post/signup', userController.signup);
  app.get('/customer/get/meals',userController.meals);
  app.get('/customer/get/signedin', userController.checkAuth);

};