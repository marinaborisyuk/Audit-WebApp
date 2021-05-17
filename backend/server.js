import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import data from './data';
import config from './config';
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';
import serviceRoter from './routers/serviceRoter';

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
app.use('/api/services', serviceRoter);
app.use('/api/orders', orderRouter);

app.get("/api/services", (req, res) => {
    res.send(data.services);
});
app.use('/uploads', express.static(path.join(__dirname, '/../uploads/')))
app.use(express.static(path.join(__dirname, '/.../frontend')));

app.get('/api/services/:id', (req, res) => {
    const service = data.services.find((x) => x._id === req.params.id);  
    if (service) {
        res.send(service);
    } else {
        res.status(404).send({message: 'Услуга не найдена...'});
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/index.html'))
});

app.use((err, req, res, next) => {
    const status = err.name && err.name === 'ValidationError' ? 400 : 500;
    res.status(status).send({message: err.message});
});

app.listen(3000, () => {
    console.log('Server has been started on 3000 port');
});