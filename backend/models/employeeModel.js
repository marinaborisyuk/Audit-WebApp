import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: {type: String, required: true },
    jobTitle: {type: String, required: true },
    competencyEvaluation: {type: Number, default: 0.0, required: true },
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;