const express = require('express');
const data = require('./data.js')
const app = express();

app.get("/api/services", (req, res) => {
    res.send(data.services);
});

app.listen(5000, () => {
    console.log('Server has been started on 5000 port');
})