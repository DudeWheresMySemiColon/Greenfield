var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js');

    var aws = require('aws-sdk');

   module.exports = function(app, express){


    var userRouter = express.Router();
    //var orderRouter = express.Router();    

  	app.use(morgan('dev'));
  	app.use(bodyParser.urlencoded({extended: true}));
  	app.use(bodyParser.json());
  	app.use(express.static(__dirname + '/../../client'));

    app.use('/api/users', userRouter);
    //app.use('/api/users/customer', orderRouter)

    app.use(helpers.errorLogger);
    app.use(helpers.errorHandler);

    require('../users/userRoutes.js')(userRouter);
    //require('../orders/orderRoutes.js')(orderRouter);

}
