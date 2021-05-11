import express from 'express';
import cors from 'cors';
import data from './data.js';

const app = express();

app.use(cors());
app.get("/api/services", (req, res) => {
    res.send(data.services);
});

app.get('/api/services/:id', (req, res) => {
    const service = data.services.find((x) => x._id === req.params.id);  
    if (service) {
        res.send(service);
    } else {
        res.status(404).send({message: 'Услуга не найдена...'});
    }
});

app.listen(3000, () => {
    console.log('Server has been started on 3000 port');
});