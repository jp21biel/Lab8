"use strict";
 
const express = require('express');
const app = express();
 
// Serve static files from the 'public' folder
app.use(express.static('public'));
 
// Parse JSON request bodies (needed for POST)
app.use(express.json());
 
// ---- Your endpoints go below this line ----
app.get('/hello', (req, res) => {
  res.type('text').send('Hello from the server!');
});

app.get('/api/time', (req, res)=>{
  let date = new Date().toISOString();
  res.type('json').send({
    currentTime: date,
    message: "Current server time"
  });
});

app.get('/api/greet/:name', (req, res)=>{
  let urlName = req.params.name;
  let greet = "Hello, " + urlName + "!";
  res.type('json').send({
    greeting: greet
  });
});

app.get('/api/math', (req, res)=>{
  let a = Number(req.query.a);
  let b = Number(req.query.b);
  let opp = req.query.operation;
  let result = 0;
  switch(opp){
    case "add":
      result = a + b;
      break;
    case "subtract":
      result = a - b;
      break;
    case "multiply":
      result = a * b;
      break;
    case "divide":
      result = a / b;
      break;
    default:
      result = "error";
  }
  res.type('json').send({
    a: a,
    b: b,
    operation: opp,
    result: result
  });
});

app.get('/api/slow', (req, res) => {
  setTimeout(() => {
    res.json({
      message: "Sorry for the wait!",
      delayMs: 3000
    });
  }, 3000);
});

app.get('/api/unreliable', (req, res) => {
  const rand = Math.random();
  if (rand < 0.5) {
    res.status(500).json({
      error: "Server had a bad day. Try again!"
    });
  } else {
    res.json({
      message: "Lucky! It worked this time.",
      luckyNumber: Math.floor(Math.random() * 100)
    });
  }
});

let messages = [
  { id: 1, text: "Welcome to the message board!", author: "Admin" },
];
let nextId = 2;
app.get('/api/messages', (res, req) => {
  res.json(messages[0]);
});
app.post('/api/messages', (res, req) => {
  let {txt, auth} = req.body;
  if(!txt || !auth){
    res.status(400).json({error: "text and author are required"});
  }else{
    messages.push(
      {id: nextId, text: txt, author: auth}
    )
  }
  res.status(201).json(messages[nextID - 1]);
  nextId++;
});
 
// ---- Your endpoints go above this line ----
 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
