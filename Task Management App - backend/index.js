// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

let tasks = [
  { id: 1, title: 'Sample Task', description: 'This is a sample task', dueDate: '2024-07-30', status: 'To-Do' },
  // Add more tasks as needed
];

app.use(cors());
app.use(express.json());

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = { id: Date.now(), ...req.body };
  tasks.push(newTask);
  res.json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;
  tasks = tasks.map(task => (task.id === Number(id) ? updatedTask : task));
  res.json(updatedTask);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== Number(id));
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
