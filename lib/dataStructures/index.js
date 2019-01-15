/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
require('fs').readdirSync(__dirname).forEach((file) => {
  if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
    const name = file.replace('.js', '');
    exports[name] = require(`./${file}`);
  }
});
