/*

Instructions: Create an app that gives the user information about pokemon
	1. npm init, npm install express and body-parser.
	2. import the array from object.js into this file
	3. dont forget to store express in a variable, and include your middle of app.use(bodyParser.json())
	4. create a get route called '/all-pokemon' where you send as json all of the pokemon
	5. create a get route called '/evolved-pokemon' where you send as json all of the evolved pokemon
		- tip: filter through the items, then send that filter through
	6. create a get route called '/non-evolved-pokemon' where you send as json all of the non-evolved pokemon
		- tip: filter through the items, then send that filter through
	7. create a get route called '/pokemon/:poke', where it only sends through information for the pokemon that you put '/pokemon/<in here>'
		- i used the es6 array function "filter" here
    - if the pokemon is not found, send this message "res.status(400).send("No pokemon with that name!!!")"
      - if you remember, a 400 is a "Not Found" Error. We will send that to the client to be taken care of there
      - a successful request is a 200, which is assumed as part of every request.
        We need to customize the errors that we send to the client dependent on situation.
        Here, the pokemon is not found, so we'll send a "400 not found"
	8. create a post route called '/submit-new-poke' that:
		- posts this object(use postman)
			{
				"name": "Blastoise",
				"evolvedFrom": "Wartortle",
				"evolvesTo": null
			}
    - Adds it to the current static pokemon array
		- then send through using res.json with
      - the updated object with the new Pokemon
      - the message "<this pokemon> has been added to the Database"
	9. set up a listen route to run your server
*/
