const mysql = require('mysql');
const databaseConnection = mysql.createConnection(process.env.LOCAL_DATABASE);
databaseConnection.connect();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

app.get('/dogs', function(req, res){
  /*
    putting the read database query into the express callback
    This is an read from the database, so im using 'app.get'

    We don't need any information from the request since we're just getting all
    of the dog records from the database
  */
  // Query to get all of the dog breed records from the database
  const allDogBreedsSelectQuery = "SELECT * FROM dog_breeds";
  databaseConnection.query(allDogBreedsSelectQuery, function(err, data){
    try {
      if(err){
        throw err
      }
      // if successful, then send all of the dog breeds to the client
      res.json({success: true, data: data})
    } catch (e) {
      // if there's an error, communicate the error to the client
      res.json({success: false, error: e})
    }
  });
});

/*
  Here, we want to get a single dog breed based on the param that we input
*/
app.get('/dogs/:breed', function(req, res){
  /* Getting the value that we input for the param here, removing the "+" symbols and replacing them with a space */
  const dogBreed = req.params.breed.split("+").join(" ");
  /* Running a Sql Select Query to only retrieve information for one dog breed */
  const dogByBreedSelectQuery = "SELECT * FROM dog_breeds WHERE breed='"+dogBreed+"'";
  console.log("Select By Breed Query: " + dogByBreedSelectQuery);
  databaseConnection.query(dogByBreedSelectQuery, function(err, data){
    try {
      if(err){
        throw err
      }
      // if successful, then send the information for that dog breed back to the client
      res.json({success: true, data: data})
    } catch (e) {
      // if there's an error, communicate the error to the client
      res.json({success: false, error: e})
    }
  });
})

app.listen(3000, function(){
	console.log('Example app listening on port 3000!')
});
