if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Root.prod'); // eslint-disable-line
} else {
  module.exports = require('./Root.dev'); // eslint-disable-line
}
