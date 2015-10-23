angular.module('foodly.order', [])

.controller('OrderController', function($scope, Order) {

	$scope.order = Order.getMealOrder();

	$scope.submitOrder = function() {
		Order.submitOrder($scope.order)
			.then(function() {
				alert('Your order will be arriving soon!');
			});
	};

})