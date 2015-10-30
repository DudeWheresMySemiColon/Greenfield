angular.module('foodly.order', [])

.controller('OrderController', function($scope, $location,Order,Counter) {

	$scope.orders = Order.getMealOrder();
	console.log($scope.orders)
	$scope.checkOrder = function(){
		if($scope.orders.orders.length === 0){
			$location.path("/");
		}
	};
	$scope.submitOrder = function() {
		Order.submitOrder($scope.orders)
		.then(function(){
			Order.cartOrder({orders: []});
			Counter.number = 0;
			$('#myModal').modal('toggle')
			$location.path("/");
			});
	};
	$scope.getTotal = function(){
    	var total = 0;
	    for(var i = 0; i < $scope.orders.orders.length; i++){
	    	if($scope.orders.orders[i].price){
	        total += $scope.orders.orders[i].price
	    	}
	    }
    return total;
}	
	$scope.checkOrder();
})