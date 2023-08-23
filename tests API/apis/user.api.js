const config = require('./shared/config');

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const user = {
  /**
   * @returns {Promise<object>} - list of user items
   */
  returnAllUserItems: async () => {
    return fetch(config.api + `/user/items`, {
      headers,
      method: 'GET',
    });
  },

  /**
   * @param {string} - requires id of a user item
   * @returns {Promise<object>} - Specific user item data
   */
  returnSpecificUserItem: async (id) => {
    return fetch(config.api + `/user/${id}/item`, {
      headers,
      method: 'GET',
    });
  },

  /**
   * @param {object} payload - requires an object with any value
   * @returns {Promise<object>} - Data object with all user items
   */
  createSpecificUserItem: async (payload) => {
    return fetch(config.api + `/user/item`, {
      headers,
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

module.exports = user;
