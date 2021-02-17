//requiring express package using npm install express --save
var express = require('express');
//requiring body-parser packing using npm install express --save
var bodyParser = require('body-parser');

//storing our express function in a variable
var app = express();

var object = require('./object.js')

//express interacting with body-parser to set up middleware
//to be able to read json being sent in
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

//all of the above code is boilerplate code, which means it is most
//likely used in all node/express applications

// '/all-pokemon' route, when you type in http://localhost:3000/all-pokemon
// you're letting it know:
	//when this route is hit on the url...
	//...res.json is the information that you're sending to the client, which is the object
app.get('/all-pokemon', function(req, res){
	res.json(object)
});

// '/evolved-pokemon' route, when you type in http://localhost:3000/evolved-pokemon
// you're letting it know:
	//when this route is hit on the url...
	//you're filtering out only the evolved pokemon
	//...res.json is sending the information that you're sending to the client, which is the object
app.get('/evolved-pokemon', function(req,res){
	var filterEvolved = object.filter((poke) => {
		return poke.evolvedFrom;
	})
	res.json(filterEvolved);
});

// '/non-evolved-pokemon' route, when you type in http://localhost:3000/non-evolved-pokemon
// you're letting it know:
	//when this route is hit on the url...
	//you're filtering out only the non-evolved pokemon
	//...res.json is sending the information that you're sending to the client, which is the object
app.get('/non-evolved-pokemon', function(req,res){
	var filterNonEvolved = object.filter((poke) => {
		return !poke.evolvedFrom;
	})
	res.json(filterNonEvolved);
});

// '/pokemon/:poke' route, when you type in http://localhost:3000/pokemon/:poke
// you're letting it know:
	//when this route is hit on the url...
	//the name that is put in the place of :poke, is either being added to the array, and then
	//being push through by res.json, or if that pokemon isn't in the object, then the array
	//will have an index of 0, and a 404 (page not found) will be sent to the client
	//...res.json is sending the information that you're sending to the client, which is the pokemon entered '/pokemon/<here>'
app.get('/pokemon/:poke', function(req,res){
	const pokemon = object.filter((pokemon) => req.params.poke.toLowerCase() === pokemon.name.toLowerCase())
	if(pokemon.length > 0){
		res.json(pokemon);
	} else {
		res.status(404).send("No pokemon with that name")
	}
});

// '/submit-new-poke' is a post route, you won't hit this through the browser
// this route is usually hit through your client side
// please try in postman - remember to put information in the body of the post in postman
// req.body is the information that is coming in through the post
// Here, we are checking our object against the item that was pushed through in the post
// based on the conditional, whatever matches, we are sending through to the client with res.send
app.post('/submit-new-poke', function(req, res){
		object.push(req.body);
		res.json({pokemon: object, message: req.body.name + " has been added to the object"})
});

//this wildcard route picks up every route, put it on the bottom above
//your app.listen. It will let you know if the route that the client tried
//to hit is not set up in your express application
app.get("*", function(req,res){
	res.status(404).send('uh oh! page not found')
});

//sets up your server to be visited on http://localhost:3000
app.listen(3000, function(){
	console.log('Example app listening on port 3000!')
});
