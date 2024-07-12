const express = require("express")
const morgan = require("morgan");
const cors = require('cors')
const app = express();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
morgan.token('reqBody', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'));

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});