const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

const eventRoute = require('./route/event');

app.use(cors());

app.use(express.json());

app.use('/event', eventRoute)

app.listen(8080, () => {
  console.log('The server is running')
})
