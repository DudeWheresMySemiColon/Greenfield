var User = require('./userModel.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple');

module.exports = {

  signin: function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function(foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var username  = req.body.username,
        password  = req.body.password,
        create,
        newUser;

    var findOne = Q.nbind(User.findOne, User);

    // check to see if user already exists
    findOne({username: username})
      .then(function(user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          // make a new user if not one
          create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            password: password,
            meals: [],
            orders: []
          };
          return create(newUser);
        }
      })
      .then(function (user) {
        // create token to send back for auth
        var token = jwt.encode(user, 'secret');
        res.json({token: token});
      })
      .fail(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.status(200).send();
          } else {
            res.status(401).send();
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  },
  meals: function(req,res,next){

    //getting all meals using aggregation pipeline
    var aggr = Q.nbind(User.aggregate,User);

    aggr({$project:{meals:1}},{$unwind:"$meals"})
      .then(function(meals){
        res.json(meals)
      })
      .fail(function(err){
        next(err)
      });

    // var findAll= Q.nbind(User.find,User);
    // findAll({},{meals:true,_id:false})
    //   .then(function(user_meals){
    //     var alltheMeals = {meals:[]};
    //     for(var i = 0;i<user_meals.length;i++){
    //       for(var j = 0;j<user_meals[i].meals.length;j++){
    //         alltheMeals.meals.push(user_meals[i].meals[j]);
    //       }
    //     }
    //     //console.log(alltheMeals)
    //     res.json(alltheMeals);
    //   }) 
    //   .fail(function(error){
    //     next(error);
    //   })
  },
    addOrder: function (req, res, next){
    var username = req.body.username,
      title = req.body.orders[0].title,
      price = req.body.orders[0].price,
      description = req.body.orders[0].description,
      update;
    
    var findOne = Q.nbind(User.findOne,User);
    var findUser = Q.nbind(User.findOne, User);
    
    //check if the username exists
    findUser({username: username})
      .then(function(user){
        if (!user){
          next(new Error('User does not exist'));
        } else {
          //vor the verified username, finf the ._id, and push in order
          update = Q.nbind(User.findByIdAndUpdate, User);

        newOrder = {
          title: title,
          price: price,
          description: description
        };
        console.log(newOrder)

      update(user._id,
            {$push: {"orders" : newOrder}})   
        }
      })
      .then(function(user){
        res.json(user)

      })
      .fail(function (error) {
        next(error);
      });
    
  
  }
}
