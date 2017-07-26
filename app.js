const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

// set environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'dist')));

// routes
app.get('/', function(req, res) {
  res.render('index.pug');
});

http.createServer(app).listen(app.get('port'), function(){
  // console.log('server runnin');
});

module.exports = app;