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
  putting the delete database query into the express callback
  This is a delete from the database, so im using 'app.delete'

  We need the information from the body of the request in order to input into
  the sql query
*/
app.delete('/dogs/breed', function(req, res){
  /* Getting the breed from the postman body */
  const breed = req.body.breed;
  // inserting that breed into the sql query
  let deleteDogBreedQuery = "DELETE FROM dog_breeds WHERE breed='"+breed+"'";
  console.log("Delete Dog Breed Query: " + deleteDogBreedQuery);
  // running the delete sql query
  databaseConnection.query(deleteDogBreedQuery, function(err, data){
    try {
      if(err){
        throw err
      }
      console.log(data)
      // The response from the database will show that affectedRows is
      // greater than 0 if the deletion was successful
      const isDeleted = data.affectedRows > 0;
      if(isDeleted){
        // if a successful deletion, then send that information to the client
        res.json({success: true, message: "The " + breed + " Dog Breed Deleted successfully"})
      } else {
        // if not a successful deletion, then send a 404 NOT FOUND to the user with a message
        res.status(404).json({success: false, message: "The " + breed + " Dog Breed Deletion not Successful"})
      }
    } catch (e) {
      // if a database error, then send that information to the client
      res.json({success: false, error: e})
    }
  });
});

app.listen(3000, function(){
	console.log('Example app listening on port 3000!')
});
