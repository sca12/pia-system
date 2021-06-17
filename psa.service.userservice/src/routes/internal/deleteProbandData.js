const Joi = require('joi');
const internalUsersHandler = require('../../handlers/internal/internalUsersHandler');

module.exports = {
  path: '/user/users/{username}',
  method: 'DELETE',
  handler: internalUsersHandler.deleteProbandData,
  config: {
    description: 'deletes a user and all its data',
    tags: ['api'],
    validate: {
      params: Joi.object({
        username: Joi.string()
          .description('the username of the user to delete')
          .required(),
      }).unknown(),
      query: Joi.object({
        keepUsageData: Joi.boolean()
          .description(
            'will not delete questionnaire answers which are marked to keep its answers and log data if true'
          )
          .default(false)
          .optional(),
      }).unknown(),
    },
  },
};
