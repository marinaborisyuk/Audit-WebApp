import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
import { isAuth } from '../utils';

const orderRouter = express.Router();

orderRouter.get('/mine', isAuth, expressAsyncHandler( async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.send(orders);
}));

orderRouter.get('/:id', isAuth, expressAsyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({message: 'Заказ не найден...'});
    }
}));

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    const order = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        contactInfo: req.body.contactInfo,
        totalPrice: req.body.totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).send({message: 'Заказ сформирован!', order: createdOrder});
}));

export default orderRouter;

