var express = require('express')
  , bodyParser = require('body-parser')
  , app = express()
  , geoLocations = []
  , env = { Local: 0, Azure: 1 };

app.use(express.static('www'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});    

var positions = [];

app.post('/positions', function(req, res) {
    
    var index = positions.findIndex(position => position.id === req.body["id"]);

    console.log('req: ',req.body);

    if(index > -1)
        positions[index] = req.body;
    else
        positions.push(req.body);

    res.send("ok");
});

app.get('/positions', function(req, res) {
    res.send(positions);
});

app.delete('/positions', function(req, res) {
    positions = [];
    res.send("ok");
});

var port;
var envMode = env.Azure;
process.argv.forEach((val, index, array) => {
  if (val === 'local') {
    envMode = env.Local;
  }
});

if (envMode === env.Local)
    port = 80;
else
    port = process.env.PORT;

app.listen(port, function (error) {
    if(!error)
        console.log('Find server is listen to port: '+port);
    else
        console.log('error on find server inicialization: '+error);
});
