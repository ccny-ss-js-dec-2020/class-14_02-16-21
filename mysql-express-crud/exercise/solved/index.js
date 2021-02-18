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

app.get('/cats', function(req, res){
  const allCatBreedsSelectQuery = "SELECT * FROM cat_breeds";
  databaseConnection.query(allCatBreedsSelectQuery, function(err, data){
    try {
      if(err){
        throw err
      }
      // if successful, then send all of the cat breeds to the client
      res.json({success: true, data: data})
    } catch (e) {
      // if there's an error, communicate the error to the client
      res.json({success: false, error: e})
    }
  });
});

/*
  Here, we want to get a single cat breed based on the param that we input
*/
app.get('/cats/:breed', function(req, res){
  /* Getting the value that we input for the param here, removing the "+" symbols and replacing them with a space */
  const catBreed = req.params.breed.split("+").join(" ");
  /* Running a Sql Select Query to only retrieve information for one cat breed */
  const catByBreedSelectQuery = "SELECT * FROM cat_breeds WHERE breed='"+catBreed+"'";
  console.log("Select By Breed Query: " + catByBreedSelectQuery);
  databaseConnection.query(catByBreedSelectQuery, function(err, data){
    try {
      if(err){
        throw err
      }
      // if successful, then send the information for that cat breed back to the client
      res.json({success: true, data: data})
    } catch (e) {
      // if there's an error, communicate the error to the client
      res.json({success: false, error: e})
    }
  });
})

app.post('/cats', function(req, res){
  let breed = null;
  let lifespan = null;
  let origin = null;
  let height = null;
  let length = null;

  if(req.body.breed){
    breed = "'"+req.body.breed+"'";
  }
  if(req.body.lifespan){
    life_span = "'"+req.body.lifespan+"'"
  }
  if(req.body.origin){
    origin = "'"+req.body.origin+"'"
  }
  if(req.body.height){
    height = "'"+req.body.height+"'"
  }
  if(req.body.length){
    length = "'"+req.body.length+"'"
  }

  let insertCatBreedQuery = "INSERT INTO cat_breeds (breed, lifespan, origin, height, length) VALUES ";
  insertCatBreedQuery += "(";
  insertCatBreedQuery += breed + ",";
  insertCatBreedQuery += lifespan + ",";
  insertCatBreedQuery += origin + ",";
  insertCatBreedQuery += height + ",";
  insertCatBreedQuery += length;
  insertCatBreedQuery += ")";
  console.log("Insert Cat Breed Query: " + insertCatBreedQuery);
  databaseConnection.query(insertCatBreedQuery, function(err, data){
    try {
      if(err){
        throw err
      }
      // if there is a successful database response, communicate that to the user
      res.json({success: true, message: "Cat Breed added to database successfully"})
    } catch (e) {
      // if there is an error, communicate that to the user
      res.json({success: false, error: e})
    }
  });
});

app.put('/cats', function(req, res){
  /* Getting all of the appropriate values from the postman body */
  const column = req.body.column;
  const updated_value = req.body.updated_value;
  const breed = req.body.breed;
  /* Inserting those values into the sql query */
  let insertCatBreedQuery = "UPDATE cat_breeds SET "+column+"='"+updated_value+"' WHERE breed='"+breed+"'";
  console.log("Update Cat Breed Query: " + insertCatBreedQuery);
  databaseConnection.query(insertCatBreedQuery, function(err, data){
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
        res.json({success: true, message: "Cat Breed Updated successfully"})
      } else {
        // if no update happened, then send a 404 NOT FOUND Error,
        // meaning that most likely no update was made since the database record was not found
        res.status(404).json({success: false, message: "No Update to Cat Breed"})
      }
    } catch (e) {
      // if there was a database error, then report that to the client
      res.json({success: false, error: e})
    }
  });
});

app.delete('/cats', function(req, res){
  /* Getting the breed from the postman body */
  const breed = req.body.breed;
  // inserting that breed into the sql query
  let deleteCatBreedQuery = "DELETE FROM cat_breeds WHERE breed='"+breed+"'";
  console.log("Delete Cat Breed Query: " + deleteCatBreedQuery);
  // running the delete sql query
  databaseConnection.query(deleteCatBreedQuery, function(err, data){
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
        res.json({success: true, message: "The " + breed + " Cat Breed Deleted successfully"})
      } else {
        // if not a successful deletion, then send a 404 NOT FOUND to the user with a message
        res.status(404).json({success: false, message: "The " + breed + " Cat Breed Deletion not Successful"})
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
