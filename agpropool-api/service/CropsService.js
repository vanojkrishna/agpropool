'use strict';


/**
 * Create crop object 
 * 
 *
 * api_key String 
 * body Crop A crop objects
 * no response value expected for this operation
 **/
exports.createCrop = function(api_key,body) {
  return new Promise(function (resolve, reject) {
    let sql = `INSERT INTO crop VALUES(?,?)`;
    db.run(sql,[body.crop_id,body.name], (err, row) => {
      if (err) {
        reject('Create Crop Request Failed');
        console.error(err.message);
      } else {
        resolve({ "result": "success" });
      }
    });
  });
}


/**
 * Creates list of crops with given input array
 * 
 *
 * api_key String 
 * body List List of crop objects
 * no response value expected for this operation
 **/
exports.createCropsWithListInput = function(api_key,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Deletes a crop
 * 
 *
 * cropId Integer Crop id to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteCrop = function(cropId,api_key) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * List All Available Crops
 * List all Available Crops
 *
 * api_key String 
 * returns List
 **/
exports.listAllCrops = function(api_key) {
  return new Promise(function (resolve, reject) {
    var resp = {};
    var respList = [];
    let sql = `SELECT crop_id as crop_id,name as name FROM crop`;
    
    db.each(sql, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      resp = {
        "crop_id": row.crop_id,
        "name": row.name
      }
      console.log(row);
      respList.push(resp);
    },()=> {resolve(respList)});
  });
}

