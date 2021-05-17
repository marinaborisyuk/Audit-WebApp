"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const serviceSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  includingServices: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0.0,
    required: true
  },
  rating: {
    type: Number,
    default: 0.0,
    required: true
  },
  numReviews: {
    type: Number,
    default: 0,
    required: true
  }
}, {
  timestamps: true
});

const Service = _mongoose.default.model('Service', serviceSchema);

var _default = Service;
exports.default = _default;