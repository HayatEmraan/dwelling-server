const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const { connectDB } = require("./db/mongodb");
const morgan = require("morgan");
require("dotenv").config();
app.use(cors());
app.use(morgan("dev"));

connectDB();

app.use("/", require("./routes/routes"));

app.listen(port);
