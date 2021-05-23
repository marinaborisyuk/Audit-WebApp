import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Employee from '../models/employeeModel';
import Pdf from '../models/pdfModel';
import Purpose from '../models/purposeModel';
import { isAdmin, isAuth } from '../utils';

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

methodRoter.post('/createpdf', expressAsyncHandler( async (req, res) => {
    const pdf = new Pdf({
        estimates: req.body.estimates,
        employees: req.body.employees,
        purposes: req.body.purposes,
        results: req.body.results,
    });
    const createdPdf = await pdf.save();
    if (createdPdf) {
        res.status(201).send({message: 'Запить добавлена!', pdf: createdPdf});
    } else {
        res.status(500).send({message: 'Ошибка при добавлении записи...'});
    }
}));

export default methodRoter;