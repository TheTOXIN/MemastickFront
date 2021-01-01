//Install express server
const express = require('express');
// const sslRedirect = require('heroku-ssl-redirect');
const path = require('path');
const app = express();

//User redirect to https for heroku
// app.use(sslRedirect());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/frontmem'));

//WTF???
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/frontmem/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
