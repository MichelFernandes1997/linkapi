const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000);

app.get("/", (req, res) => {
  res.send("Rota funcionando!!");
  console.log("Working");
});
