var mealController = require('./mealController.js');

module.exports = function(app) {

	app.get('/api/users/customers/get/meals', mealController.getMeals);

	app.post('/api/users/vendors/post/meal', mealController.addMeal);

};