const express = require('express');
const uniqid = require('uniqid')
const fs = require('fs')
const router = express.Router();

const eventData = require('../data/eventData.json');

router.get('/', (req,res) => {
  res.status(200).send(eventData)
})

router.post('/', (req,res) => {
  console.log(req.body)
  const id = {
    "id": uniqid()
  }
  const newObject = Object.assign({}, req.body, id)
  eventData.push(newObject)
  fs.writeFileSync('./data/eventData.json', JSON.stringify(eventData, null, 2))
  res.status(200).send(eventData)
})

module.exports = router;