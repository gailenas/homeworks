const config = require('./shared/config');

const login = {
  /**
   * @returns {Promise<object>} - Return JS object
   */
  generateSessionJwt: async () => {
    return fetch(config.api + '/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
};

module.exports = login;
