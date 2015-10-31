angular.module('foodly.meals', [])

.controller('MealController', function($scope, $location, Meals, Order, Auth, Counter) {


	$scope.data = []; //meals available for purchase
	$scope.meal = {}; //meal to add
	$scope.order = {orders: []};
	$scope.count = Counter;

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
		$scope.meal.url = angular.element( document.querySelector( '#preview' ) )[0].currentSrc
		Meals.addMeal({meals: [$scope.meal], username: Auth.getUsername()})
			.then(function() {
				console.log($scope.meal.description, 'sent to server.');
				$location.path('/'); //added successfully
			})
			.catch(function(err) {
				console.log(err);
			});
	};
	$scope.checkOut = function(){
		if(Counter.number === 0){
			alert("Please order something before checking out")
		}else{
			$location.path('/order');
		}
	};



	//ng-click will activate this. order will
	//be retrieved from ng-model
	$scope.orderMeal = function(meal) {
		meal.meals.username = Auth.getUsername();
		$scope.order.orders.push(meal.meals)
		Order.cartOrder($scope.order);
		Counter.number = Counter.number +1;

	};

})