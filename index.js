// require
const express = require("express");
const https = require("https");
require("dotenv").config();
const path = require("path");
// variables
const app = express();
const port = process.env.PORT;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.post("/", (req, res) => {
  const pokeID = Number(req.body.pokeID);
  const url = "https://pokeapi.co/api/v2/pokemon/" + pokeID;
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`
  https.get(url, (response) => {
    let responseData = "";
    response.on("data", (chunk) => {
      responseData += chunk;
    });
    response.on("end", () => {
      let pokeInfo = JSON.parse(responseData);
      let pokemonName = pokeInfo.name;
      let pokeType = pokeInfo.types[0].type.name;
      res.write(`<h1>Name of your searched pokemon is ${pokemonName}</h1>`);
      res.write(`<img src="${img}" alt="" style="width:300px"/> `);
      res.write(`<h3>Type of your searched pokemon is ${pokeType}</h3>`);
      res.send();
    });
  });
});



// server listen
app.listen(port, () => {
  console.log("App is running on " + port);
});
