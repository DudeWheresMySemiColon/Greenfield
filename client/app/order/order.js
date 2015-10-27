angular.module('foodly.order', [])

.controller('OrderController', function($scope, $location,Order) {

	$scope.order = Order.getMealOrder();

	$scope.submitOrder = function() {
		Order.submitOrder($scope.order)
		.then(function(){
			$('#myModal').modal('toggle')
			$location.path("/");
			});
	};
})