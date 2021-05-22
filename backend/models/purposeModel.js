import mongoose from 'mongoose';

const purposeSchema = new mongoose.Schema({
    name: {type: String, required: true },
}, { timestamps: true });

const Purpose = mongoose.model('Purpose', purposeSchema);

export default Purpose;