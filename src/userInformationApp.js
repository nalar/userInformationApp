// Requires several modules
var fs 		= require('fs');
var express = require('express');
var jade 	= require('jade');
var bodyParser = require('body-parser')

// Start express and set settings
var app 	= express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/views'));			// Tells express to use the static functionality
app.set('views','./src/views');							// Sets the directory where views can be found
app.set('view engine','jade');							// Sets the view engine used to jade


app.get('/', function(request, response){									// On get request for /
	fs.readFile('./src/views/users.json','utf8', function(err, data){		// Read in the users.json file
		if(err){throw err};													// Error handler
		userList = JSON.parse(data);										// Parse the JSON data from the file
		response.render('index', {userList: userList});						// Render index.jade with variable userList passed on
	});
});

app.get('/matches', function(request, response){							// On get request for /matches
	response.redirect('/')													// Redirect user to /
});

app.get('/adduser', function(request, response){							// On get request for /adduser
	response.render('adduser');												// Render adduser.jade
});

app.post('/adduser', function(request, response){							// On post request for /adduser
	fs.readFile('./src/views/users.json','utf8', function(err, data){		// Read the current userfile from users.json
		if(err){throw err};													// Error handler
		userList = JSON.parse(data);										// Parse the JSON data from the file
		firstName = request.body.firstName;									// Get the first name from the request
		lastName = request.body.lastName;									// Get the last name from the request
		emailAddress = request.body.emailAddress;							// Get the email address from the request
		newUser = {firstName, lastName, emailAddress};						// Define the newUser variable
		userList.push(newUser)												// Push the newUser to the userList
		fs.writeFile('./src/views/users.json', JSON.stringify(userList));	// Write the userList file to users.json
		response.send("Added user: \n" + firstName + " " + lastName)		// Confirm that user was added to enduser
	});
});

app.post('/matches', function(request, response){							// On post request for /matches
	var matchList = [];														// Define an empty match list
	fs.readFile('./src/views/users.json','utf8', function(err, data){		// Read the users.json file
		if(err){throw err};													// Error handler
		userList = JSON.parse(data);										// Parse the JSON data from the file
		for(i=0; i<userList.length; i++){									// For the length of the userList
			if(request.query.searchTerm != "" && userList[i].firstName.toLowerCase().includes(request.query.searchTerm.toLowerCase()) || request.query.searchTerm != "" && userList[i].lastName.toLowerCase().includes(request.query.searchTerm.toLowerCase())){		// See if the searchterm is contained in the users name
				matchList.push(userList[i])									// Push the user to the list
			}
		}
		matchList = matchList.sort();										// Sort the match list
		response.send(matchList);											// Send the matchList variable as response
	});
});

var server = app.listen(3000, function () {									// Set express to listen on port 3000
	console.log('userInformationApp running on: ' + server.address().port); // Log that information
});