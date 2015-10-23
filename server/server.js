var express = require("express");
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');

var app = express();


var port = process.env.PORT || 3000;





//---------------------------------------------------------------------
//mongoLab credentials - i have these from the last project
var dbuser = 'admin';
var dbpassword = 'admin';

//set up URI connection to mongolab
var uristring = process.env.MONGOLAB_URI || 
process.env.MOGOHQ_URL ||
'mongodb://' + dbuser + ':' + dbpassword + '@ds043714.mongolab.com:43714/foodly';

var mongooseUri = uriUtil.formatMongoose(uristring);

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } }; 

mongoose.connect(mongooseUri, options);
var db = mongoose.connection;

db.once('open',function(){
  console.log('connected to : ', mongooseUri);
})

require('./config/middleware.js')(app, express);




app.listen(port);
console.log('Server now listening on port ' + port);

module.exports = app;

// var Schema = mongoose.Schema;
