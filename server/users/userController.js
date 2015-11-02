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

 
  },

  addMeal: function (req,res,next){
    var update;
    if (req.body.hasOwnProperty('orders')) { 
      var meal = [];
      var username = req.body.username;
      for(var i =0;i<req.body.orders.length;i++){
        title = req.body.orders[i].title,
        price = req.body.orders[0].price,
        description = req.body.orders[i].description, 
        ingredients = req.body.orders[i].ingredients
         meal.push({
          title: title,
          price: price,
          description: description,
          ingredients: ingredients
        });
      }
      field = "orders" 
     } else {
      var url = req.body.meals[0].url
      console.log('Url ' + req.body.meals[0].url);
      //then we have a meal (vendor)
      console.log("I'm a vendor meal")
      var username = req.body.username;
      var title = req.body.meals[0].title,
      price = req.body.meals[0].price,
      description = req.body.meals[0].description,
      ingredients = req.body.meals[0].ingredients,
      field = "meals"
    }
    
    var findOne = Q.nbind(User.findOne,User);
    var findUser = Q.nbind(User.findOne, User);
    
    //check if the username who submitted the request exists
    findUser({username: username})
      .then(function(user){
        if (!user){
          next(new Error('User does not exist'));
        } else {
          
          //for the verified username, finf the ._id, and push in order or meal
          update = Q.nbind(User.findByIdAndUpdate, User);

        var newMealitem = {
          title: title,
          price: price,
          description: description,
          ingredients: ingredients,
          url: url
        };
      
        //push the meal object into the respective array
        console.log('later user',field,newMealitem)
        if (field==="meals"){
                update(user._id,
            {$push: {"meals" : newMealitem}}) 
              } else {
                  update(user._id,
            {orders : meal}) 
              }
        }
      })
      .then(function(user){
        console.log('has it been updated',user)
        res.json(user)

      })
      .fail(function (error) {
        next(error);
      });
    
  }



 

  // getVendorLatLong = function(req,res,next){
  //   //expect request to be a meal object with _id field which is used as a matching param
  //   //we will return an array with lat long of the user who owns that meal [Lat,Long]
  //   /*   {
  //           "title": "Pad Thai",
  //           "price": 12.99,
  //           "_id": {
  //               "$oid": "56299289108f9b181d2bf218"
  //           } */

  //   //we will match the meal based on the id, so collect this from the request
  //   var oId = req.body._id["$oid"]        
  //   var aggr = Q.nbind(User.aggregate,User);

  //   //use aggregation pipeline to get the parent docuement for that meal
  //   aggr.([{$project{orders:1,location:1}},
  //           {$unwind:"$orders"},
  //           {$match:{"orders._id":ObjectId('"'+oId+'"')}
  //         }])
  //   .then(function(data){
  //     //setup the response array Lat, Long
  //     var resp = [data.location[0],data.location[1]];
  //     res.send(resp)
  //   })

  // .fail(function(err){
  //   next(err)
  // });


  // }


}
