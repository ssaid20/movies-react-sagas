const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

// GET request to retrieve individual movie details
router.get('/:id', (req, res) => {
  // assign id key to send as variable on pool.query
  const movieId = req.params.id
  // SQL join query for M2M table relationships, STRING_AGG shows genres as a list separated by commas
  const queryText = `SELECT movies.id, movies.title, movies.poster, movies.description, STRING_AGG(genres.name, ', ') AS genre FROM movies
  JOIN movies_genres ON movies_genres.movie_id=movies.id
  JOIN genres ON genres.id=movies_genres.genre_id
  WHERE movies.id=$1
  GROUP BY movies.id, movies.title, movies.poster, movies.description;`

  pool.query(queryText, [movieId])
    .then(result => {
      // send our data back
      res.send(result.rows)
    }).catch(error => {
      console.log("error on server-side details GET", error);
      res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
    .then(result => {
      console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id

      // Now handle the genre reference
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

      // Catch for first query
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})

router.put('/:id', (req, res) => {
  console.log(req.params, req.body)
  const queryText = `UPDATE "movies"
  SET "title"=$1, "description"=$2
  WHERE "id"=$3;`
  pool.query(queryText, [req.body.title, req.body.description, req.params.id])
    .then(result => res.sendStatus(200))
    .catch(err => {
      console.log("error on router put", err);
      res.sendStatus(500);
    })
})

module.exports = router;