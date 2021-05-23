import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
    estimates: {type: String, required: true },
    employees: {type: String, required: true },
    purposes: {type: String, required: true },
    results: {type: String, required: true },
}, { timestamps: true });

const Pdf = mongoose.model('Pdf', pdfSchema);

export default Pdf;