const Joi = require('joi');

const changePasswordHandler = require('../handlers/changePasswordHandler.js');

module.exports = {
  path: '/user/newPassword',
  method: 'PUT',
  handler: changePasswordHandler.newPassword,
  config: {
    description: 'requests a new password for the user',
    auth: {
      strategy: 'jwt_login',
      mode: 'optional',
    },
    tags: ['api'],
    validate: {
      payload: Joi.object({
        user_id: Joi.string()
          .description('the login name of the user')
          .optional(),
      }).unknown(),
    },
  },
};