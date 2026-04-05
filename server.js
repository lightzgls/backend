const express = require('express');
const cors = require('cors');
const models = require('./models');

const app = express();
app.use(cors()); // Allow frontend to call the backend

// Custom delay to simulate real-world latency
app.use((req, res, next) => setTimeout(next, 100));

app.get('/test/info', (req, res) => {
    res.json(models.schemaInfo());
});

app.get('/user/list', (req, res) => {
    res.json(models.userListModel());
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const user = models.userModel(userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});

app.get('/photosOfUser/:id', (req, res) => {
    const userId = req.params.id;
    const photos = models.photoOfUserModel(userId);
    if (!photos) {
        return res.status(404).send('Photos not found');
    }
    res.json(photos);
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Backend server successfully listening on port ${PORT}`);
});
