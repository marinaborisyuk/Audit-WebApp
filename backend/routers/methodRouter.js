import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Employee from '../models/employeeModel';
import Purpose from '../models/purposeModel';
// import { isAuth, isAdmin } from '../utils';


const methodRoter = express.Router();

methodRoter.get('/', expressAsyncHandler( async (req, res) => {
    const employees = await Employee.find({});
    const purposes = await Purpose.find({});
    res.send({employees: employees, purposes: purposes});
}));

methodRoter.get('/createpurposes', expressAsyncHandler(async (req, res) => {
    try {
        const purpose = new Purpose({
            name: 'Методы контроля и мониторинга деятельности',
        });
        const createPurpose = await purpose.save();
        res.send(createPurpose);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}));

export default methodRoter;