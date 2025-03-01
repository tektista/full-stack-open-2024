require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const Blog = require("./models/blog");

app.use(cors());
app.use(express.json())

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
