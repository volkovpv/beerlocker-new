'use strict';

let mongoose = require('mongoose');

let BeerSchema   = new mongoose.Schema({
    name    : String,
    type    : String,
    quantity: Number,
    userId  : String
});

module.exports = mongoose.model('Beer', BeerSchema);