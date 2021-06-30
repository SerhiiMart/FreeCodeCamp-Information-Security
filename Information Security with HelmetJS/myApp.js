const express = require('express');
const app = express();

const helmet = require("helmet");
const ninetyDaysInSeconds = 90*24*60*60;
app.use(
  helmet({
    hidePoweredBy: true,
    frameguard: {action: 'deny' },
    xssFilter: true,
    noSniff: true,
    ieNoOpen: true,
    hsts: {maxAge: ninetyDaysInSeconds, force: true},
  })
);




















































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
