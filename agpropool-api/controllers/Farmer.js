"use strict";

var utils = require("../utils/writer.js");
var Farmer = require("../service/FarmerService");

module.exports.addFarmer = function addFarmer(req, res, next) {
  var api_key = req.swagger.params["api_key"].value;
  var body = req.swagger.params["body"].value;
  Farmer.addFarmer(api_key, body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteFarmer = function deleteFarmer(req, res, next) {
  var farmerId = req.swagger.params["farmerId"].value;
  var api_key = req.swagger.params["api_key"].value;
  Farmer.deleteFarmer(farmerId, api_key)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.getFarmerById = function getFarmerById(req, res, next) {
  var farmerId = req.swagger.params["farmerId"].value;
  var api_key = req.swagger.params["api_key"].value;
  Farmer.getFarmerById(farmerId, api_key)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.listAllFarmers = function listAllFarmers(req, res, next) {
  console.log(req);
  var api_key = req.swagger.params["api_key"].value;
  Farmer.listAllFarmers(api_key)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateFarmer = function updateFarmer(req, res, next) {
  var api_key = req.swagger.params["api_key"].value;
  var body = req.swagger.params["body"].value;
  Farmer.updateFarmer(api_key, body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};
