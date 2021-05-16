import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {type: String, required: true },
    description: {type: String, required: true },
    category: {type: String, required: true },
    price: {type: Number, default: 0.0, required: true },
    rating: {type: Number, default: 0.0, required: true },
    numReviews: {type: Number, default: 0, required: true },
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

export default Service;