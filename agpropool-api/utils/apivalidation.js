var allowed_api_keys = ["abcd", "xyz"];
var validateKey = (exports.validateKey = function(key) {
  if (allowed_api_keys.indexOf(key) != -1) {
    return true;
  } else {
    return false;
  }
});
