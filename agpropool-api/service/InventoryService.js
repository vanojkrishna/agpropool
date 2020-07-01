"use strict";

/**
 * List All Crops in the Inventory
 * List Crop Inventory
 *
 * api_key String
 * returns List
 **/
var keyValid = require("../utils/apivalidation.js");
exports.getInventory = function(api_key, date) {
  return new Promise(function(resolve, reject) {
    if (keyValid.validateKey(api_key)) {
      var resp = {};
      var respList = [];
      let sql = `select inventory.crop_id as crop_id,crop.name as crop_name,sum(quantity) as sum from inventory LEFT JOIN transaction_details ON inventory.transaction_id=transaction_details.transaction_id LEFT JOIN crop ON inventory.crop_id=crop.crop_id where date=? group by inventory.crop_id`;
      db.each(
        sql,
        [date],
        (err, row) => {
          if (err) {
            console.error(err.message);
          }
          resp = {
            crop_id: row.crop_id,
            crop_name: row.crop_name,
            quantity: row.sum
          };
          respList.push(resp);
        },
        () => {
          resolve(respList);
        }
      );
      /*db.all(
      sql,
      [date],
      (err, rows) => {
        console.log("dfjndskjsd");
        if (err) {
          console.log(err);
        }
        rows.forEach(row => {
          console.log(row.name);
          resp = {
            crop_id: row.crop_id,
            crop_name: row.crop_name,
            quanity: row.sum
          };
          respList.push(resp);
        });
      },
      () => {
        resolve(respList);
      }
    );*/
    } else {
      reject("Invalid key");
    }
  });
};
