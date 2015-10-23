angular.module('foodly.meals', [])

.controller('MealController', function($scope, $location, Meals) {

	$scope.data = {}; //meals available for purchase
	$scope.meal = {}; //meal to add

	$scope.getMeals = function() {
		Meals.getMeals()
			.then(function(data) {
				$scope.data = data;
			})
			.catch(function(err) {
				console.log(err);
			});
	};
	$scope.getMeals(); // must be called for initial page load

	$scope.addMeal = function(meal) {
		Meals.addMeal($scope.meal)
			.then(function() {
				$location.path('/'); //added successfully
			})
			.catch(function(err) {
				console.log(err);
			});
	};

})