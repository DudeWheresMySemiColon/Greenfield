angular.module('foodly.meals', [])

.controller('MealController', function($scope, $location, Meals, Order) {


	$scope.data = {}; //meals available for purchase
	$scope.meal = {}; //meal to add
	$scope.order = {};



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

	$scope.addMeal = function() {
		Meals.addMeal($scope.meal)
			.then(function() {
				$location.path('/'); //added successfully
			})
			.catch(function(err) {
				console.log(err);
			});
	};




	//ng-click will activate this. order will
	//be retrieved from ng-model
	$scope.orderMeal = function(meal) {
		Order.cartOrder($scope.order);
	  console.log(meal.title);
		$location.path('/order');
	};

})