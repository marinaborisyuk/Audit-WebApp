import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import data from './data';
import config from './config';


mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log('Connected to mongodb!');
})
.catch((error) => {
    console.log(error.reason)
});

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

app.listen(5000, () => {
    console.log('Server has been started on 5000 port');
});