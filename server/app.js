const express = require('express');
const connectDB = require('./config/connect');

const app = express();
const port = 3000;

app.use(express.json());

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on: http://localhost:${port}`);
    });
}).catch(err => {
    console.error(err);
});


const taskRouter = require('./routes/task');
app.use('/api/tasks', taskRouter);

