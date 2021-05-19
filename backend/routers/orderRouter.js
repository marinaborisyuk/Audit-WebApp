import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
import User from '../models/userModel';
import Service from '../models/serviceModel';
import { isAdmin, isAuth } from '../utils';

const orderRouter = express.Router();

orderRouter.get('/summary', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    const orders = await Order.aggregate([
        {
            $group: {
                _id: null,
                numOrders: {$sum: 1},
                totalSales: {$sum: '$totalPrice'}
            },
        },
    ]);
    const users = await User.aggregate([
        {
            $group: {
                _id: null,
                numUsers: {$sum: 1},
            },
        },
    ]);
    const dailyOrders = await Order.aggregate([
        {$group: {
            _id: {$dateToString: {format: '%Y-%m-%d', date: '$createdAt'}},
            orders: {$sum: 1},
            sales: {$sum: '$totalPrice'},
        }}
    ]);
    const serviceCategories = await Service.aggregate([
        {$group: {
            _id: '$category',
            count: {$sum: 1},
        }}
    ]);
    res.send({users, orders, dailyOrders, serviceCategories});
}));

orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user');
    res.send(orders);
}));

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

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        const deletedOrder = await order.remove();
        res.send({message: 'Заказ удален.', service: deletedOrder});
    } else {
        res.status(404).send({message: 'Заказ не найден...'});    
    }
}));

orderRouter.put('/:id/complete', isAuth, expressAsyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isCompleted = true;
        order.completedAt = Date.now();
        const updatedOrder = await order.save();
        res.send({message: 'Заказ завершён!', order: updatedOrder});
    } else {
        res.status(404).send({message: 'Заказ не найден...'});
    }
}));

export default orderRouter;

