var _ = require('lodash');

var localEnvVars = {
  TITLE:      'web_reels',
  SAFE_TITLE: 'web_reels',
  topSecret: 'sushi'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
