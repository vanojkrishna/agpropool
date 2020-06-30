"use strict";

var utils = require("../utils/writer.js");
var Inventory = require("../service/InventoryService");

module.exports.getInventory = function getInventory(req, res, next) {
  var api_key = req.swagger.params["api_key"].value;
  var inventoryDate = req.swagger.params["date"].value;
  Inventory.getInventory(api_key, inventoryDate)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};
