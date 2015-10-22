var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser')

   module.exports = function(app, express){
  	app.use(morgan('dev'));
  	app.use(bodyParser.urlencoded({extended: true}));
  	app.use(bodyParser.json());
  	app.use(express.static(__dirname + '/../../client'));

    //what is this?
  	app.use('api/users');
  	app.use('api/users');
  	app.use('app/meals');
  	app.use('api/orders');
   };