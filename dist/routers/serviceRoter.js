"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _serviceModel = _interopRequireDefault(require("../models/serviceModel"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const serviceRoter = _express.default.Router();

serviceRoter.get('/', (0, _expressAsyncHandler.default)(async (req, res) => {
  const services = await _serviceModel.default.find({});
  res.send(services);
}));
serviceRoter.get('/:id', (0, _expressAsyncHandler.default)(async (req, res) => {
  const service = await _serviceModel.default.findById(req.params.id);
  res.send(service);
}));
serviceRoter.post('/', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const service = new _serviceModel.default({
    name: 'Ведение',
    description: 'Ведение бухгалтерского учёта — комплекс действий, направленных на оптимизацию налогообложения, формирование первичных учетных документов в соответствии с требованиями действующего законодательства, составление и сдачу бухгалтерской и налоговой отчетности. Согласно Закону РБ  «О бухгалтерском учете и отчетности» руководители предприятий имеют право передать на договорных началах ведение бухгалтерского учета специализированной организации.',
    category: 'Бухгалтерские услуги',
    includingServices: 'Данный вид услуг предполагает: разработку учетной политики для целей бухгалтерского учета и налогообложения; отражение всех фактов хозяйственной деятельности в бухгалтерском и налоговом учете с использованием программы 1С: Бухгалтерия; расчет заработной платы сотрудников; расчет налогов; составление и сдачу бухгалтерской отчетности, налоговых деклараций и форм статистического наблюдения; представление интересов клиента в ИМНС, внебюджетных фондах и органах статистического учета. С порядком оказания услуг по ведению бухгалтерского учета можно ознакомиться здесь: «Порядок оказания услуг по ведению бухгалтерского учета».',
    price: 2100,
    rating: 4,
    numReviews: 13
  });
  const createdService = await service.save();

  if (createdService) {
    res.status(201).send({
      message: 'Новая услуга добавлена!',
      service: createdService
    });
  } else {
    res.status(500).send({
      message: 'Ошибка при создании услуги...'
    });
  }
}));
serviceRoter.put('/:id', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const serviceId = req.params.id;
  const service = await _serviceModel.default.findById(serviceId);

  if (service) {
    service.name = req.body.name;
    service.description = req.body.description;
    service.category = req.body.category;
    service.includingServices = req.body.includingServices;
    service.price = req.body.price;
    const updatedService = await service.save();

    if (updatedService) {
      res.send({
        message: 'Услуга изменена',
        service: updatedService
      });
    } else {
      res.status(500).send({
        message: 'Ошибка при изменении услуги...'
      });
    }
  } else {
    res.status(404).send({
      message: 'Услуга не найдена...'
    });
  }
}));
var _default = serviceRoter;
exports.default = _default;