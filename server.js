const https = require("https"),
  fs = require("fs");
const express = require('express');

const options = {
  key: fs.readFileSync("./ssl/ssl.key"),
  cert: fs.readFileSync("./ssl/ssl.cert")
};

const app = express();
const port = 8080

app.use('/static', express.static('public'))

app.use((req, res) => {
  res.writeHead(200);
  res.end("hello world\n");
});

https.createServer(options, app).listen(port);
console.log('app running in '+port)