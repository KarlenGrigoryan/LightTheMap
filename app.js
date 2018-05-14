const express =  require('express');
const config = require('./config')

const app = express();

// Routing
require('./server/routing')(app);

// ...or push an existing repository from the command line
// git remote add origin https://github.com/KarlenGrigoryan/LightTheMap.git
// git push -u origin master

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});