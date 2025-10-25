require('dotenv').config(); // load .env file
const express = require('express');
const cors = require('cors');
const { connect } = require('./db');
const route = require('./router');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Debug: check environment variables
console.log('DB_SERVER:', process.env.DB_SERVER);

connect(); // connect to SQL Server

app.use( route);

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
