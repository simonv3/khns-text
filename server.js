'use strict';

const path = require('path')

const twilio = require('twilio')
const Promise = require('bluebird')
const express = require('express')
const moment = require('moment')
const helmet = require('helmet')
const nunjucks  = require('nunjucks')

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const phoneNumber = process.env.TWILIO_PHONE_NUMBER

const client = new twilio(accountSid, authToken)

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(helmet())

nunjucks.configure('views', {
  autoescape : true,
  express : app
})

app.get('/', authenticationMiddleware, index)
app.get('/twilio-webhook', webhookResponse)

http.listen(process.env.PORT || 3000, function () {
  console.log(`Server listening on port ${process.env.PORT}!`)
})

function authenticationMiddleware (req, res, next) {
  // Eventually we'll probably want some auth
  next()
}

function index (req, res) {
  getMessagesSinceDay(moment().format('YYYY-MM-DD'))
    .then((messages) => {

      res.render('index.html', {
        messages : messages
      });
    })
}

function webhookResponse (req, res) {
  io.emit('new-text');
  res.contentType('text/xml')
  res.send('<Response></Response>')
}

/*
 * Messages sent since day `dateString`
 * @param {string} dateString - YYYY-MM-DD
 *
 */
function getMessagesSinceDay (dateString) {
  return new Promise((resolve, reject) => {
    client.messages.list({ to: phoneNumber, dateSent: `>=${dateString}` }, (err, data) =>{
      if (err) { return reject(err) }
      resolve(data)
    })
  })
}
