var express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    request = require('request'),
    app = express(),
    PORT = process.env.PORT || 3000,
    MYSQL_HOST = process.env.MYSQL_HOST || 'localhost',
    MYSQL_USER = process.env.MYSQL_USER || 'root',
    MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'root',
    MYSQL_DB = process.env.MYSQL_DB || 'mydb';

app.use(bodyParser.json());

con = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB
})

con.connect(function(err){
  if(err) throw err;
  console.log('Connected')
})


app.get('/api/movies', function(req, res){
  con.query('SELECT * FROM movies', function(err, result){
    if(err){
      res.status(500).send({"status": "Something went wrong !"})
    }
    res.json(result)
  })
});

app.post('/api/movies', function(req, res){
  var movie = req.body;
  con.query('INSERT INTO movies SET ?', movie, function(err, result){
    if(err){
      res.status(400).send({"status": "Invalid request payload"})
    }
    movie.id = result.insertId;
    res.status(201).send(movie)
  })
});


app.listen(PORT, function(){
  console.log('Listening on port', PORT);
});
