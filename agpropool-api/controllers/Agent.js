'use strict';

var utils = require('../utils/writer.js');
var Agent = require('../service/AgentService');

module.exports.createAgent = function createAgent (req, res, next) {
  var api_key = req.swagger.params['api_key'].value;
  var body = req.swagger.params['body'].value;
  Agent.createAgent(api_key,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteAgent = function deleteAgent (req, res, next) {
  var api_key = req.swagger.params['api_key'].value;
  var agentname = req.swagger.params['agentname'].value;
  Agent.deleteAgent(api_key,agentname)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAgentByName = function getAgentByName (req, res, next) {
  var api_key = req.swagger.params['api_key'].value;
  var agentname = req.swagger.params['agentname'].value;
  Agent.getAgentByName(api_key,agentname)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.loginAgent = function loginAgent (req, res, next) {
  var api_key = req.swagger.params['api_key'].value;
  var username = req.swagger.params['username'].value;
  var password = req.swagger.params['password'].value;
  Agent.loginAgent(api_key,username,password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.logoutAgent = function logoutAgent (req, res, next) {
  var api_key = req.swagger.params['api_key'].value;
  Agent.logoutAgent(api_key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateAgent = function updateAgent (req, res, next) {
  var api_key = req.swagger.params['api_key'].value;
  var agentname = req.swagger.params['agentname'].value;
  var body = req.swagger.params['body'].value;
  Agent.updateAgent(api_key,agentname,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
