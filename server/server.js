const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));
app.use((request, response, next) => {
    var now = new Date().toString();
    var log = '\x1b[1m \x1b[35m' + now + ': \x1b[33m' + request.method + ' \x1b[34m' + request.url + ' ' + ' \x1b[32m' + response.statusCode;
    console.log(log);
    next();
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})
