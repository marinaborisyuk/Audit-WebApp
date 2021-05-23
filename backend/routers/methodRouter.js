import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Employee from '../models/employeeModel';
import Pdf from '../models/pdfModel';
import Purpose from '../models/purposeModel';
import pdf from 'html-pdf';
import pdfTemplate from '../documents';

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
    const pdfModel = new Pdf({
        estimates: req.body.estimates,
        employees: req.body.employees,
        purposes: req.body.purposes,
        results: req.body.results,
    });
    const createdPdf = await pdfModel.save();
    if (!createdPdf) {
        res.status(500).send({message: 'Ошибка при добавлении записи...'});
    } else
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err, result) => {
        if (err) {
            res.send(Promise.reject());
        }
        return res.json({ result: result });
    });
}));

methodRoter.get('/fetchpdf', (req, res) => {
    res.sendFile('E:\\БГУИР. ИСИТ в экономике\\4й семестр\\Курсач_САиПИС\\1\\Coursework-Audit-WebApp\\result.pdf');
});

export default methodRoter;