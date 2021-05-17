"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderSchema = new _mongoose.default.Schema({
  orderItems: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    service: {
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'Service',
      required: true
    }
  }],
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contactInfo: {
    firmName: String,
    address: String,
    city: String,
    firmPhone: String
  },
  totalPrice: Number
}, {
  timestamps: true
});

const Order = _mongoose.default.model('Order', orderSchema);

var _default = Order;
exports.default = _default;