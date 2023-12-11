const path = require('path');
const express = require("express");
const app = express();
const cors = require("cors");

require('dotenv').config();

const routes = require("./routes/api");
var postRouter = require("./routes/postRouter");

const port = process.env.PORT || 3001;

// Enable all request
app.use(cors());

// parsing application/json
app.use(express.json());

// parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use('/api/', postRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '/app/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/app/dist/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running at port http://localhost:${port}!`);
});