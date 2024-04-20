const express = require('express')
const serverless = require('serverless-http')
const router = require('./routes/author')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const dbCloudUrl = `mongodb+srv://Admin:admin@serveless-api-ragas.yrw2h8l.mongodb.net/?retryWrites=true&w=majority&appName=serveless-api-ragas`

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
  .connect(dbCloudUrl)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err)
  })
app.use('/.netlify/functions/api', router)
module.exports.handler = serverless(app)
