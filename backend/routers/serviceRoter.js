import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Service from '../models/serviceModel';
import { isAuth, isAdmin } from '../utils';


const serviceRoter = express.Router();

serviceRoter.get('/', expressAsyncHandler( async (req, res) => {
    const services = await Service.find({});
    res.send(services);
}));

serviceRoter.get('/:id', expressAsyncHandler( async (req, res) => {
    const service = await Service.findById(req.params.id);
    res.send(service);
}));

serviceRoter.post('/', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    const service = new Service({
        name: 'Ведение',
        description: 'Ведение бухгалтерского учёта — комплекс действий, направленных на оптимизацию налогообложения, формирование первичных учетных документов в соответствии с требованиями действующего законодательства, составление и сдачу бухгалтерской и налоговой отчетности. Согласно Закону РБ  «О бухгалтерском учете и отчетности» руководители предприятий имеют право передать на договорных началах ведение бухгалтерского учета специализированной организации.',
        category: 'Бухгалтерские услуги',
        includingServices: 'Данный вид услуг предполагает: разработку учетной политики для целей бухгалтерского учета и налогообложения; отражение всех фактов хозяйственной деятельности в бухгалтерском и налоговом учете с использованием программы 1С: Бухгалтерия; расчет заработной платы сотрудников; расчет налогов; составление и сдачу бухгалтерской отчетности, налоговых деклараций и форм статистического наблюдения; представление интересов клиента в ИМНС, внебюджетных фондах и органах статистического учета. С порядком оказания услуг по ведению бухгалтерского учета можно ознакомиться здесь: «Порядок оказания услуг по ведению бухгалтерского учета».',
        price: 2100,
        rating: 4,
        numReviews: 13,
    });
    const createdService = await service.save();
    if (createdService) {
        res.status(201).send({message: 'Новая услуга добавлена!', service: createdService});
    } else {
        res.status(500).send({message: 'Ошибка при создании услуги...'});
    }
}));

serviceRoter.put('/:id', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    const serviceId = req.params.id;
    const service = await Service.findById(serviceId);
    if (service) {
        service.name = req.body.name;
        service.description = req.body.description;
        service.category = req.body.category;
        service.includingServices = req.body.includingServices;
        service.price = req.body.price;
        const updatedService = await service.save();
        if (updatedService) {
            res.send({message: 'Услуга изменена', service: updatedService });
        } else {
            res.status(500).send({message: 'Ошибка при изменении услуги...'});
        }
    } else {
        res.status(404).send({message: 'Услуга не найдена...'});
    }
}));

serviceRoter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);
    if (service) {
        const deletedService = await service.remove();
        res.send({message: 'Услуга удалена.', service: deletedService});
    } else {
        res.status(404).send({message: 'Услуга не найдена...'});    
    }
}));

export default serviceRoter;