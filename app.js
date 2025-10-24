const express = require('express');
const cors = require('cors');
const { connect } = require('./db');
const route = require('./router');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

connect(); // connect to SQL Server

app.use(route);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
