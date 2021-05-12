import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import data from './data';
import config from './config';
import userRouter from './routers/userRouter';


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
app.use(bodyParser.json());
app.use('/api/users', userRouter);

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

app.use((err, req, res, next) => {
    const status = err.name && err.name === 'ValidationError' ? 400 : 500;
    res.status(status).send({message: err.message});
});

app.listen(3000, () => {
    console.log('Server has been started on 3000 port');
});