const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;
const { connectDB } = require("./db/mongodb");
require("dotenv").config();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://dwelling-bright.vercel.app",
      "https://dwl-mu.vercel.app/",
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/api/v1", require("./routes/v1/routes"));
app.use("/api/v2", require("./routes/v2/routes"));

app.listen(port);
