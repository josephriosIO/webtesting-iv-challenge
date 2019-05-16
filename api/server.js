const express = require("express");
var bodyParser = require("body-parser");

const moviestars = require("../routes/moviestarsModel.js");

const server = express();

server.use(express.json());
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.status(200).json("HELLO");
});

server.post("/api/moviestars", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "please enter moviestars name" });
  }
  try {
    const moviestar = await moviestars.insert(req.body);
    res.status(201).json(moviestar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

server.delete("/api/moviestars/:id", async (req, res) => {
  try {
    const moviestar = await moviestars.remove(req.params.id);
    res.status(200).json(moviestar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = server;
