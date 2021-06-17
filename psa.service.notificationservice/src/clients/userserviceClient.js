const fetch = require('node-fetch');
const Boom = require('@hapi/boom');
const { config } = require('../config');

const serviceUrl = config.services.userservice.url;

class UserserviceClient {
  /**
   * @param username
   * @returns {Promise<string[]>}
   */
  static async getProbandsWithAccessToFromProfessional(username) {
    let res;
    try {
      res = await fetch.default(
        `${serviceUrl}/user/professional/${username}/allProbands`,
        {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (e) {
      throw Boom.serverUnavailable(
        'userserviceClient getProbandsWithAccessToFromProfessional: Did not receive a response',
        e
      );
    }
    if (!res.ok) {
      throw Boom.internal(
        'userserviceClient getProbandsWithAccessToFromProfessional: received an Error',
        await res.text(),
        res.status
      );
    }
    return await res.json();
  }
}

module.exports = UserserviceClient;
