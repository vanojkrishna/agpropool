"use strict";

/**
 * Create transaction object
 *
 *
 * api_key String
 * body Transaction A transaction object
 * no response value expected for this operation
 **/
const { v4: uuidv4 } = require("uuid");
exports.createTransaction = function(api_key, body) {
  return new Promise(function(resolve, reject) {
    //generate transaction_id
    //write into transaction_details and transaction_id
    //for each crop write to inventoy table
    //use parallelize to write to both tables
    const txnId = uuidv4();
    let sqlTransaction = `INSERT INTO transaction_details (transaction_id,date,created_by,farmer_id) VALUES(?,?,?,?)`;
    let sqlInventory = `INSERT INTO inventory (transaction_id,crop_id,quantity) VALUES(?,?,?)`;
    db.beginTransaction(function(err, transaction) {
      let errorFlag = false;
      transaction.run(
        sqlTransaction,
        [txnId, body.date, body.created_by, body.farmer_id],
        (err, row) => {
          if (err) {
            console.log(err);
            errorFlag = true;
          }
        }
      );
      body.crops.forEach(crp => {
        transaction.run(
          sqlInventory,
          [txnId, crp.crop_id, crp.qty],
          (err, row) => {
            if (err) {
              console.log(err);
              errorFlag = true;
            }
          }
        );
      });
      transaction.commit(function(err) {
        if (err) {
          reject("Failed to store Transaction details");
        } else {
          resolve({ result: "success" });
        }
      });
      if (errorFlag) {
        console.log("failed ------");
        transaction.rollback(function(err) {
          console.log("error occured");
          reject("Failed to store Transaction details");
        });
      }
    });
  });
};

/**
 * Delete transaction object
 *
 *
 * api_key String
 * transactionId String A transaction Id
 * no response value expected for this operation
 **/
exports.deleteTransaction = function(api_key, transactionId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
};
