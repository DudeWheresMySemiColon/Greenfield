var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');

//mongoLab credentials - i have these from the last project
var dbuser = 'sonny';
var dbpassword = 'sonny';

//set up URI connection to mongolab
var uristring = process.env.MONGOLAB_URI || 
process.env.MOGOHQ_URL ||
'mongodb://' + dbuser + ':' + dbpassword + '@ds039674.mongolab.com:39674/heroku_wtk9d4hm';

var mongooseUri = uriUtil.formatMongoose(uristring);

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } }; 

mongoose.connect(mongooseUri, options);

var db = mongoose.connection;
var Schema = mongoose.Schema;

//initiate connection
db.on('error',function(err){
  console.log('failed connecting to: ', mongooseUri, err)
});

//once connected, define schema
db.once('open',function(){
  console.log('connected to : ', mongooseUri);

  //define schema - mealsSchema - to be nested
  var mealsSchema = new Schema({
    'title': String,
    'price': Number,
   
  });

  //define schema - userSchema, with nested meals
  db.userSchema = new Schema({
    'username': String,
    'password': String,
    'meals': [mealsSchema]
  });

  //attach model constructor to db object
  db.User = mongoose.model("User", db.userSchema);
});




module.exports = db;