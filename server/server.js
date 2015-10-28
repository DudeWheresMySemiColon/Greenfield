var express = require("express");
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var aws = require('aws-sdk');

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



app.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: 'AKIAITE3JGULA4YD3NYA', secretAccessKey: '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'});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: 'mks-greenfield',
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://mks-greenfield.s3.amazonaws.com/'+req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});



app.listen(port);
console.log('Server now listening on port ' + port);

module.exports = app;

// var Schema = mongoose.Schema;
