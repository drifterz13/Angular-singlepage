var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var cors = require('cors');

var app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '80';
app.set('port', port);

app.listen(port, () => {
  console.log(`Connecting to port ${port}`);
});


// const server = http.createServer(app);
// server.listen(port, () => console.log(`Running on port: ${port}`));
