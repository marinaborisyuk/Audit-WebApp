import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            name: {type: String, required: true},
            price: {type: Number, required: true},
            service: {type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true},
        },
    ],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    contactInfo: {
        firmName: String,   
        address: String,
        city: String,
        firmPhone: String,
    },
    totalPrice: Number,
    isCompleted: { type: Boolean, required: true, default: false },
    completedAt: Date,
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;