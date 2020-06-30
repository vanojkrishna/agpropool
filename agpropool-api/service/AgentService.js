'use strict';

/**
 * Create farmer agent
 * Create farmer agent
 *
 * api_key String 
 * body FarmerAgent Created agent object
 * no response value expected for this operation
 **/
exports.createAgent = function (api_key, body) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    var resp = {};
    console.log(body.agent_id);
    db.run("INSERT INTO farm_agent VALUES('" + body.agent_id + "','" + body.name + "','" + body.gender + "','" + body.phone_number + "','" + body.age + "')", function (err, row) {
      if (err) {
        reject(new Error('Create Agent Request Failed'));
        console.error(err.message);
      } else {
        resolve({ "result": "success" });
      }
    });
  });
}

/**
 * Delete agent
 * This can only be done by the logged in user.
 *
 * api_key String 
 * agentname String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteAgent = function (api_key, agentname) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Get agent by agent name
 * 
 *
 * api_key String 
 * agentname String The name that needs to be fetched.
 * returns FarmerAgent
 **/
exports.getAgentByName = function (api_key, agentname) {
  return new Promise(function (resolve, reject) {
    var resp = {};
    let sql = `SELECT agent_id as agent_id,
    name as name,
    gender as gender,
    phone_number as phone_number,
    age as age
      FROM farm_agent where name = ?`;

    db.get(sql, [agentname], (err, row) => {
      if (err) {
        console.error(err.message);
      }
      resp = {
        "agent_id": row.agent_id,
        "gender": row.gender,
        "name": row.name,
        "phone_number": row.phone_number,
        "age": row.age
      }
      console.log(row.agent_id + "\t" + row.name);
      resolve(resp);
    });
  });
}
/**
 * Logs agentinto the system
 * 
 *
 * api_key String 
 * username String The user name for login
 * password String The password for login in clear text
 * returns String
 **/
exports.loginAgent = function (api_key, username, password) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs out current logged in agent's session
 * 
 *
 * api_key String 
 * no response value expected for this operation
 **/
exports.logoutAgent = function (api_key) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Updated Agent
 * Update Agent
 *
 * api_key String 
 * agentname String name that need to be updated
 * body FarmerAgent Updated agent object
 * no response value expected for this operation
 **/
exports.updateAgent = function (api_key, agentname, body) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}

