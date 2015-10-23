var request = require('supertest')
  , express = require('express');
  		app = require('../server')



// Log out currently signed in user
request(app)
	.get('/api/users/customer/post/signin')
	.end(function(err, res) {
		if(err){
			console.log("I failed");
		}
	// Delete objects from db so they can be created later for the test
	console.log(res.body);

});

