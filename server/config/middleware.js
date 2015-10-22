var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js');

   module.exports = function(app, express){


    var userRouter = express.Router();

    var userRouter = express.Router();    
  	app.use(morgan('dev'));
  	app.use(bodyParser.urlencoded({extended: true}));
  	app.use(bodyParser.json());
  	app.use(express.static(__dirname + '/../../client'));

    app.use('/api/users', userRouter);

    app.use(helpers.errorLogger);
    app.use(helpers.errorHandler);

    require('../users/userRoutes.js')(userRouter);
    
   };
    //what is this?
  	app.use('api/users',userRouter);
  	// app.use('api/users');
  	// app.use('app/meals');
  	// app.use('api/orders');
   };

   // require('../users/usersRoutes.js')(userRouter);
