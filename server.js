const express = require('express');
const cors = require('cors');
const path = require('path');
const models = require('./models');

const app = express();
app.use(cors()); // Allow frontend to call the backend

// Serve images as static files
app.use('/images', express.static(path.join(__dirname, 'images')));

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server successfully listening on port ${PORT}`);
});
