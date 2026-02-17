const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

//  Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cpu_scheduler', {
 useNewUrlParser: true,
 useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

//  Define schema
const processSchema = new mongoose.Schema({
 pid: String,
 arrivalTime: Number,
 burstTime: Number,
remainingTime: Number,
 completionTime: Number,
 turnaroundTime: Number,
 waitingTime: Number,
 startTime: Number
});

const Process = mongoose.model('Process', processSchema);

//  Save to MongoDB
app.post('/api/save', async (req, res) => {
 try {
 await Process.deleteMany(); // Clear old data
 await Process.insertMany(req.body.processes);
 res.send({ message: 'Processes saved to MongoDB' });
} catch (err) {
 res.status(500).send({ error: 'Failed to save processes' });
 }
});

//  Load from MongoDB
app.get('/api/list', async (req, res) => {
 try {
 const processes = await Process.find();
 res.send(processes);
 } catch (err) {
 res.status(500).send({ error: 'Failed to load processes' }); }
});

app.listen(PORT, () => {
 console.log(`✅ Backend running at http://localhost:${PORT}`);
});
