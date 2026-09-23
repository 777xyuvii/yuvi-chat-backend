const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());

let messages = [];

// Roblox script yahan message bhejegi
app.post('/send', (req, res) => {
    const { user, uid, message } = req.body;
    if (user && message) {
        const chatData = { user, uid, message, time: Date.now() };
        messages.push(chatData);
        if (messages.length > 50) messages.shift(); // Sirf last 50 messages store honge
        res.status(200).send({ status: "Success" });
    } else {
        res.status(400).send({ status: "Invalid Data" });
    }
});

// Roblox script yahan se naye messages nikalegi (polling)
app.get('/messages', (req, res) => {
    res.json(messages);
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Yuvi Chat Server running on port ${PORT}`);
});
