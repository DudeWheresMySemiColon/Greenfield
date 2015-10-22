angular.module('app', [])

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
    //additional routes here
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
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});