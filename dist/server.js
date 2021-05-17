"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _data = _interopRequireDefault(require("./data"));

var _config = _interopRequireDefault(require("./config"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _orderRouter = _interopRequireDefault(require("./routers/orderRouter"));

var _serviceRoter = _interopRequireDefault(require("./routers/serviceRoter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect(_config.default.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to mongodb!');
}).catch(error => {
  console.log(error.reason);
});

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use('/api/users', _userRouter.default);
app.use('/api/services', _serviceRoter.default);
app.use('/api/orders', _orderRouter.default);
app.get("/api/services", (req, res) => {
  res.send(_data.default.services);
});
app.get('/api/services/:id', (req, res) => {
  const service = _data.default.services.find(x => x._id === req.params.id);

  if (service) {
    res.send(service);
  } else {
    res.status(404).send({
      message: 'Услуга не найдена...'
    });
  }
});
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({
    message: err.message
  });
});
app.listen(3000, () => {
  console.log('Server has been started on 3000 port');
});