'use strict';

var utils = require('../utils/writer.js');
var Crops = require('../service/CropsService');

module.exports.createCrop = function createCrop (req, res, next) {
  var api_key = req.swagger.params['api_key'].value;
  var body = req.swagger.params['body'].value;
  Crops.createCrop(api_key,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createCropsWithListInput = function createCropsWithListInput (req, res, next) {
  var api_key = req.swagger.params['api_key'].value;
  var body = req.swagger.params['body'].value;
  Crops.createCropsWithListInput(api_key,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteCrop = function deleteCrop (req, res, next) {
  var cropId = req.swagger.params['cropId'].value;
  var api_key = req.swagger.params['api_key'].value;
  Crops.deleteCrop(cropId,api_key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listAllCrops = function listAllCrops (req, res, next) {
  var api_key = req.swagger.params['api_key'].value;
  Crops.listAllCrops(api_key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
