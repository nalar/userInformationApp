// Requires
var fs 		= require('fs');
var express = require('express');
var jade 	= require('jade');
var bodyParser = require('body-parser')

// Start express and set settings
var app 	= express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/views'));
app.set('views','./src/views');
app.set('view engine','jade');


app.get('/', function(request, response){
	fs.readFile('./src/views/users.json','utf8', function(err, data){
		if(err){throw err};
		userList = JSON.parse(data);
		response.render('index', {userList: userList});
	});
});

app.get('/matches', function(request, response){
	response.redirect('/')
});

app.get('/adduser', function(request, response){
	response.render('adduser');
});

app.post('/adduser', function(request, response){
	fs.readFile('./src/views/users.json','utf8', function(err, data){
		if(err){throw err};
		userList = JSON.parse(data);
		firstName = request.body.firstName;
		lastName = request.body.lastName;
		emailAddress = request.body.emailAddress;
		newUser = {firstName, lastName, emailAddress};
		userList.push(newUser)
		fs.writeFile('./src/views/users.json', JSON.stringify(userList));
		response.send("Added user: \n" + firstName + " " + lastName)
	});
});

app.post('/matches', function(request, response){
	var matchList = [];
	fs.readFile('./src/views/users.json','utf8', function(err, data){
		if(err){throw err};
		userList = JSON.parse(data);
		for(i=0; i<userList.length; i++){
			if(request.query.searchTerm != "" && userList[i].firstName.toLowerCase().includes(request.query.searchTerm.toLowerCase())){
				matchList.push(userList[i])
			}
		}
		matchList = matchList.sort();
		response.send(matchList);
	});
});

var server = app.listen(3000, function () {
	console.log('userInformationApp running on: ' + server.address().port);
});