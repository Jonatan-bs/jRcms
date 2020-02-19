const mongoose = require("mongoose"); 
const partials = require("./customCategoryPartials.js");

let models = {
  jr_product: {
    displayName: 'Product',
    fields: [
      {
        inputType: 'field',
        displayname: 'Price',
        nameInDoc: 'jr_price',
        dataType: 'number',
        requred: true,
        unique: false
      },
      {
        inputType: 'field',
        displayname: 'Name',
        nameInDoc: 'jr_name',
        dataType: 'string',
        requred: true,
        unique: true
      }
    ],
    model: ''
  },
  jr_aaaaa: {
    displayName: 'aaaaa',
    fields: [
      {
        inputType: 'field',
        displayname: 'aaaa',
        nameInDoc: 'jr_aaaa',
        dataType: 'number',
        requred: true,
        unique: true
      },
      {
        inputType: 'field',
        displayname: '',
        nameInDoc: '',
        dataType: 'number',
        requred: false,
        unique: false
      }
    ],
    model: ''
  },
  jr_ddd: { displayName: 'ddd', fields: [], model: '' },
  jr_dd: { displayName: 'dd', fields: [], model: '' },
  '': { displayName: '', fields: [], model: '' },
  jr_d: { displayName: 'd', fields: [], model: '' },
  jr_ss: { displayName: 'ss', fields: [] }
}

partials.modelsInit(models);
module.exports = models;