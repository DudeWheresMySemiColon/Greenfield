angular.module('foodly', ['foodly.order', 'foodly.services', 'foodly.auth', 'foodly.meals', 'ngRoute'])

.config(function($routeProvider, $httpProvider) {
	$routeProvider
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/', {
      templateUrl: 'app/meals/meals.html',
      controller: 'MealController'
    })
    .when('/order', {
      authenticate: true,
      templateUrl: 'app/order/order.html', 
      controller: 'OrderController'
    })
      .when('/addmeal', {
      authenticate: true,
      templateUrl: 'app/addMeal/addMeal.html',
      controller: 'MealController'
    })
    .otherwise({
      redirectTo: '/'
    });

//     //additional routes here
	$httpProvider.interceptors.push(function($window) {
		return {
			request: function (config) {
	      		var jwt = $window.localStorage.getItem('com.semicolon');
	      		if (jwt) {
	        		config.headers['x-access-token'] = jwt;
	      		}
	      		config.headers['Allow-Control-Allow-Origin'] = '*';
	      		return config;
	      	}
      	};
    });
})
.run(function ($rootScope, $location, Auth) {
  $rootScope.SearchBar = true;
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if(next.$$route && next.$$route.templateUrl === "app/meals/meals.html"){
      $rootScope.SearchBar = true;
    }else{
       $rootScope.SearchBar = false;     
    }
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      Auth.loginorout = "Sign in";
      $location.path('/signin');
    }
  });
});