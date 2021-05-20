import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Employee from '../models/employeeModel';
import { isAuth, isAdmin } from '../utils';


const employeeRoter = express.Router();

employeeRoter.get('/', expressAsyncHandler( async (req, res) => {
    const employees = await Employee.find({});
    res.send(employees);
}));

employeeRoter.get('/:id', expressAsyncHandler( async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    res.send(employee);
}));

employeeRoter.post('/', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    const employee = new Employee({
        name: 'Борисюк Марина Александровна',
        jobTitle: 'Главный аудитор',
        competencyEvaluation: 9,
    });
    const createdEmployee = await employee.save();
    if (createdEmployee) {
        res.status(201).send({message: 'Новая запись о сотруднике добавлена!', employee: createdEmployee});
    } else {
        res.status(500).send({message: 'Ошибка при создании записи о сотруднике...'});
    }
}));

employeeRoter.put('/:id', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);
    if (employee) {
        employee.name = req.body.name;
        employee.jobTitle = req.body.jobTitle;
        employee.competencyEvaluation = req.body.competencyEvaluation;
        const updatedEmployee = await employee.save();
        if (updatedEmployee) {
            res.send({message: 'Запись о сотруднике изменена', employee: updatedEmployee });
        } else {
            res.status(500).send({message: 'Ошибка при изменении записи о сотруднике...'});
        }
    } else {
        res.status(404).send({message: 'Запись о сотруднике не найдена...'});
    }
}));

employeeRoter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
        const deletedEmployee = await employee.remove();
        res.send({message: 'Запись удалена.', employee: deletedEmployee});
    } else {
        res.status(404).send({message: 'Запись не найдена...'});    
    }
}));

export default employeeRoter;