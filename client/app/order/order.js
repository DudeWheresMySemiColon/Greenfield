angular.module('foodly.order', [])

.controller('OrderController', function($scope, Order) {

	$scope.order = Order.getMealOrder();

	$scope.submitOrder = function(meal) {
		Order.submitOrder(meal)
			.then(function() {
				alert('Your order will be arriving soon!');
			});
	};

})