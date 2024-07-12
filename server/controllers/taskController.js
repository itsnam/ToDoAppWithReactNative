const Task = require('../models/Task');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const createTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const task = new Task({ title, description, status });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, description, status } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(taskId, { title, description, status }, { new: true });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
