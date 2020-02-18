const mongoose = require("mongoose"); 
const partials = require("./customCategoryPartials.js");

let models = {
  product: {
    displayName: 'Product',
    fields: [
      {
        inputType: 'field',
        displayname: 'name',
        nameInDoc: 'name',
        dataType: 'string',
        requred: true,
        unique: true
      },
      {
        inputType: 'field',
        displayname: 'price',
        nameInDoc: 'price',
        dataType: 'number',
        requred: true,
        unique: false
      }
    ],
    model: ''
  },
  cars: {
    displayName: 'Cars',
    fields: [
      {
        inputType: 'field',
        displayname: 'price',
        nameInDoc: 'price',
        dataType: 'number',
        requred: true,
        unique: false
      },
      {
        inputType: 'field',
        displayname: 'name',
        nameInDoc: 'name',
        dataType: 'string',
        requred: true,
        unique: true
      },
      {
        inputType: 'field',
        displayname: 'color',
        nameInDoc: 'color',
        dataType: 'string',
        requred: true,
        unique: false
      }
    ]
  }
}

partials.modelsInit(models);
module.exports = models;