var express = require("express");

var app = express();
var port = process.env.PORT || 3000;

app.listen(port);

require('./config/middleware.js')(app, express);

console.log('Server now listening on port ' + port);
