angular.module('foodly.order', [])

.controller('OrderController', function($scope, $location,Order) {

	$scope.orders = Order.getMealOrder();
	console.log($scope.orders)

	$scope.submitOrder = function() {
		Order.submitOrder($scope.orders)
		.then(function(){
			$('#myModal').modal('toggle')
			$location.path("/");
			});
	};
})