import express from 'express';
import User from './models/userModel';

const router = express.Router();

router.get('/createadmin', async (req, res) => {
    try {
        const user = new User({
            name: 'admin',
            email: 'admin@gmail.com',
            password: '123'
        });
        const createUser = await user.save();
        res.send(createUser);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
});