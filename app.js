const express =  require('express');
const config = require('./config')

const app = express();

// Routing
require('./server/routing')(app);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});