// Config
const config = require('./config');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + "/dist"));
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Routing
require('./server/routing')(app);

// ...or push an existing repository from the command line
// git remote add origin https://github.com/KarlenGrigoryan/LightTheMap.git
// git push -u origin master

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});