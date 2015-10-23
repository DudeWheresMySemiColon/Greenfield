// var Order = require('./orderModel.js'),
// 	Q = require('q');

// module.exports = {
// 	addOrder: function (req, res, next){
// 		console.log('earlier')
// 		var username = req.body.username,
// 			title = req.body.meal.title,
// 			price = req.body.meal.price,
// 			update;

// 		var findOne = Q.nbind(User.findOne,User);
// 		//find the user
// 		findOne({username: username})
// 		.then(function(user){
// 			if (user){
// 				console.log('here')
// 				update = Q.nbind(User.update, User);

// 				newOrder = {
// 					title: title,
// 					price: price,
// 				};

// 				return {$push: {orders: newOrder}};
// 				//add the order to that user 
// 			} else {
// 				console.log('user not found')
// 			}
// 		})
// 	}
// }