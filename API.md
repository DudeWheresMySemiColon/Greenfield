API DOCUMENTATION FOR DUDE’S WHERE MY SEMICOLON

Table of Contents:
Quicksheet-Server routes
Expected request from client and response from server
Database Schema
Client - what’s contained in each folder: client requests, and html templates
Server - Routing, 
Testing

QuickSheet - Server routes. 
  /customer/post/signup - Store user and password in database
 /customer/get/signin - Finds username and password from database and logs them in
 /customer/get/meals - Returns all the meals in the database
/customer/post/orders - Stores customers orders in the database 
 /vendors/post/meal -  Stores vendor orders in the database

Expected request from client and response from server 

1.
url: /api/users/customer/post/signup
type: POST
request data(e.g.): {username: username, password : password}
response data: {token: token} (if unique username)
description: Send this request so that the client will receive an authorization token response from the server. It will also store the username and password in the database. Authorization needed in order to checkout or add a meal.

2.
url: /api/users/customer/post/signedin
type: POST
request data: {username: username, password: password}
response_data: {token: token} (if user alread exists)
description:  Send this request so that the client will receive an authorization token response from the server. Authorization is needed in order to checkout or add a meal.

3.
url: /api/users/customer/get/meals
type: GET			
request data: N/A
response data: 
{meals:[
{title:”title”,
price:7.50,
ingredients: [sugar, spice],
username: “hello”
},
…….
]
}
description: Send this request if you want to see all the meals in the database. Includes information about the meals ingredients, username, title and description.

4.
url: /api/users/customers/post/orders
type: POST
request data (e.g): {orders: [_id: “52”, description: “This is food”, price: 10, title: “Pizza”],
[_id: “53”, description: “This is ice cream”, price: 7, title: “Ice cream”], username: “hello”}
response data: N/A
description: Send this request to store customers orders in the database 

/vendors/post/meal -  Stores vendor orders in the database

5.
url:  /vendors/post/meal 
type: POST
request_data(e.g.): {meals: [title: “Pizza”, ingredients: [tomatoes, cheese], description: “This is pizza”, price: 10], username: “hello”}
response data: N/A
description: Send this request to add a meal to the database.


Database Schema:
Database uses Mongodb, a JSON like object
{
username: {String, location: [long,lat]},
password: String,
salt: String
meals: [{title: String, price: number, description: String, ingredients: [string,string...]},{....},{....}],
orders: [{title: String, price: number, description: String, ingredients: [string,string...]},{....},{....}]
}


Testing

Testing can be located in sever/test. Testing uses supertest to test whether incoming client requests will receive a response

Client

Built with Angular. 

Folders used:

auth - For displaying pages for signing in and signing up users and authorizing them
meals - contains the logic for sending requests to add or get meals from the database. Also contains the logic for adding orders ready for checkout. Also displays the homepage which contains all the meals and the form for adding a meal
Responses sent to server: 
->/customer/get/meals
->/vendors/post/meal 
order - Contains the page for submitting the final order to a client and sending an email to the vendor.
Responses sent to server:
	>/customer/post/signup
	>/customer/post/signin
app.js - For routing on the client side and controlling logic using rootscope. Authorization, displaying the search bar, and banner. Toggles sign-in and logout.
Server:
userRoutes - contains all the routes for the server
userModel - contains the entire database schema
userController - contains the logic for handing requests from the client
helpers - handles the authorization token from the client
server - connects to amazon web services, mongodb, and creates a server