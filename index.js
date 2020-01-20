const express = require("express");
const app = express();

// Set up the server to serve the static content.
app.use(express.static(__dirname + "/dist", { index: "../index.html" }));

// Use the environment variable port if it exists.
const port = process.env.PORT || 3000;

// Start listening on the port.
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
