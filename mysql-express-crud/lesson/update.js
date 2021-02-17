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

/*
  putting the update database query into the express callback
  This is an update from the database, so im using 'app.put'

  We need the information from the body of the request in order to input into
  the sql query
*/
app.put('/dogs', function(req, res){
  /* Getting all of the appropriate values from the postman body */
  const column = req.body.column;
  const updated_value = req.body.updated_value;
  const breed = req.body.breed;
  /* Inserting those values into the sql query */
  let insertDogBreedQuery = "UPDATE dog_breeds SET "+column+"='"+updated_value+"' WHERE breed='"+breed+"'";
  console.log("Update Dog Breed Query: " + insertDogBreedQuery);
  databaseConnection.query(insertDogBreedQuery, function(err, data){
    try {
      if(err){
        throw err
      }
      // this is the response from the database
      console.log(data)
      // If there's a successful update, then Changed should equal 1 as part of the response from the database
      const isUpdated = !data.message.includes("Rows matched: 0  Changed: 0  Warnings: 0");
      if(isUpdated){
        // if an update happened, then send a successful response to the user
        res.json({success: true, message: "Dog Breed Updated successfully"})
      } else {
        // if no update happened, then send a 404 NOT FOUND Error,
        // meaning that most likely no update was made since the database record was not found
        res.status(404).json({success: false, message: "No Update to Dog Breed"})
      }
    } catch (e) {
      // if there was a database error, then report that to the client
      res.json({success: false, error: e})
    }
  });
});

app.listen(3000, function(){
	console.log('Example app listening on port 3000!')
});
