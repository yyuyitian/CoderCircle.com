const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const fs = require('fs');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

var eventId = 0
const events = []

// 静态文件服务
app.use(express.static(path.join(__dirname, '')));
const server = http.createServer((req, res) => {
  // 根据请求的 URL 构造 HTML 文件的路径
  const filePath = `.${req.url}`;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // 处理文件读取失败的情况
      res.statusCode = 404;
      res.end('File not found');
    } else {
      // 处理文件读取成功的情况
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    }
  });
});
const port = 8090;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const cors = require('cors');
app.use(cors());
  
// Create a new event
app.post('/events', (req, res) => {
    console.log('Received a create event request');
  const { title, date, time, location, description } = req.body;
  console.log('Received a create event request' + title);
  const newEvent = {
    id: ++eventId, // Assume this function generates a unique ID for the event
    title: title,
    date: date,
    time: time,
    location: location,
    description: description,
    counts: 1,
    attendees: ["owner"]
  };
  events.push(newEvent); // Assume events is an array of events stored in memory
  res.set('Access-Control-Allow-Origin', '*');
  res.json(newEvent);
});

// Join an event
app.post('/events/:id/join', (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const event = events.find(e => e.id === eventId);
  console.log(events)
  console.log('Received join request of event' + eventId);
  if (event) {
    console.log("find it");
    event.counts ++;
    event.attendees.push(req.body.name); // Assume attendees is an array of attendee names for each event
    res.sendStatus(200);
  } else {
    console.log("not find it");
    res.sendStatus(404);
  }
});

// Get an event by ID
app.get('/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const event = events.find(e => e.id === eventId);
  if (event) {
    res.json(event);
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
