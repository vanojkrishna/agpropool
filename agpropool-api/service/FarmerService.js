"use strict";

/**
 * Add a new farmer to the pool
 *
 *
 * api_key String
 * body Farmer Farmer object that needs to be added to the pool
 * no response value expected for this operation
 **/
const { v4: uuidv4 } = require("uuid");
exports.addFarmer = function(api_key, body) {
  return new Promise(function(resolve, reject) {
    let sql = `INSERT INTO farmer (farmer_id,name,gender,age,village,phone_number,created_by) VALUES(?,?,?,?,?,?,?)`;
    db.run(
      sql,
      [
        uuidv4(),
        body.name,
        body.gender,
        body.age,
        body.village,
        body.phone_number,
        body.created_by
      ],
      (err, row) => {
        if (err) {
          reject("Create Farmer Request Failed");
          console.error(err.message);
        } else {
          resolve({ result: "success" });
        }
      }
    );
  });
};

/**
 * Deletes a farmer
 *
 *
 * farmerId Integer Farmer id to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteFarmer = function(farmerId, api_key) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
};

/**
 * Returns a farmer
 *
 *
 * farmerId Integer Get Farmer By Id
 * api_key String  (optional)
 * returns Farmer
 **/
exports.getFarmerById = function(farmerId, api_key) {
  return new Promise(function(resolve, reject) {
    var resp = {};
    let sql = `SELECT farmer_id as farmer_id,
    name as name,
    gender as gender,
    age as age,
    village as village,
    phone_number as phone_number,
    created_on as created_on,
    created_by as created_by
      FROM farmer where farmer_id = ?`;

    db.get(sql, [farmerId], (err, row) => {
      if (err) {
        console.error(err.message);
      }
      resp = {
        farmer_id: row.farmer_id,
        gender: row.gender,
        name: row.name,
        phone_number: row.phone_number,
        age: row.age,
        village: row.village,
        created_by: row.created_by,
        created_on: row.created_on
      };
      console.log(row);
      resolve(resp);
    });
  });
};

/**
 * List All Farmers
 * List all farmers
 *
 * api_key String
 * returns List
 **/
exports.listAllFarmers = function(api_key) {
  return new Promise(function(resolve, reject) {
    var resp = {};
    var respList = [];
    let sql = `SELECT farmer_id,gender,name,phone_number,age,village FROM farmer`;

    db.each(
      sql,
      (err, row) => {
        if (err) {
          console.error(err.message);
        }
        resp = {
          id: row.farmer_id,
          name: row.name,
          gender: row.gender,
          age: row.age,
          village: row.village,
          phone: row.phone_number
        };
        console.log(row);
        respList.push(resp);
      },
      () => {
        resolve(respList);
      }
    );
  });
};

/**
 * Update an existing farmer
 *
 *
 * api_key String
 * body Farmer Farmer object that needs to be updated in the pool
 * no response value expected for this operation
 **/
exports.updateFarmer = function(api_key, body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
};
