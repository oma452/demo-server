const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const TodoModel = require('./Models/Todo');

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/test')


    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));

// Routes
app.get('/', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => {
            console.error('Error fetching todos:', err);
            res.status(500).json({ error: 'Failed to fetch todos' });
        });
});


app.post('/', (req, res) => {
    const task = req.body.task;
    TodoModel.create({ task })
        .then(result => res.json(result))
        .catch(err => res.json(err))


});

app.put('/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})


app.delete('/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err))

})
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
