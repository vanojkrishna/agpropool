'use strict';

var utils = require('../utils/writer.js');
var Transactions = require('../service/TransactionsService');

module.exports.createTransaction = function createTransaction (req, res, next) {
  var api_key = req.swagger.params['api_key'].value;
  var body = req.swagger.params['body'].value;
  Transactions.createTransaction(api_key,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteTransaction = function deleteTransaction (req, res, next) {
  var api_key = req.swagger.params['api_key'].value;
  var transactionId = req.swagger.params['transactionId'].value;
  Transactions.deleteTransaction(api_key,transactionId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
