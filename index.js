const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const router = express.Router();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Configure le serveur pour servir des fichiers statiques
app.use(express.static('public'));

// Routes
let BaseRouter = require("./routes/BaseRouter");

app.use("/", BaseRouter);

app.listen(PORT, ()=>{
    console.log("Server is running on port 4000");
})

