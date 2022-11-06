const express = require('express');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(express.static('dist'));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
