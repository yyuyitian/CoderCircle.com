const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const id = 1
const events = []
// Create a new event
app.post('/events', (req, res) => {
    console.log('Received a create event request');
  const { title, date, time, location, description } = req.body;
  const newEvent = {
    id: id, // Assume this function generates a unique ID for the event
    title: title,
    date: date,
    time: time,
    location: location,
    description: description
  };
  events.push(newEvent); // Assume events is an array of events stored in memory
  res.json(newEvent);
});

// Join an event
app.post('/events/:id/join', (req, res) => {
  const eventId = req.params.id;
  const event = events.find(e => e.id === eventId);
  if (event) {
    event.attendees.push(req.body.name); // Assume attendees is an array of attendee names for each event
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
