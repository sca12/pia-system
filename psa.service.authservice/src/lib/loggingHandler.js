const pgHelper = require('../services/postgresqlHelper.js');
const fetch = require('node-fetch');
const { config } = require('../config');

const serviceUrl = config.services.loggingservice.url;

/**
 * Handles the logging case for a request
 * @param {Object} request object
 */
exports.handle = async function handle(request) {
  const logMethod = getLogMethod(request);
  if (logMethod) {
    const username = retrieveUsernameFromRequest(request);
    const loggingEnabled = await checkLoggingActive(username);
    if (
      loggingEnabled &&
      request.response &&
      request.response.statusCode === 200
    ) {
      logMethod(request, request.auth.credentials, postLogActivityFn(request));
    }
  }
};

function postLogActivityFn(request) {
  return function (activity) {
    postLog(retrieveUsernameFromRequest(request), {
      app: retrieveClientType(request),
      activity: activity,
    });
  };
}

function getLogMethod(request) {
  if (request.route && request.route.settings && request.route.settings.app) {
    return request.route.settings.app.log;
  }
}

function retrieveUsernameFromRequest(request) {
  try {
    if (request.payload && request.payload.username) {
      return request.payload.username;
    } else if (request.auth.credentials) {
      return request.auth.credentials.username;
    }
  } catch (e) {
    console.log('LoggingHandler: ', e);
    return null;
  }
}

function retrieveClientType(request) {
  // Only for login event
  if (request.payload.logged_in_with) {
    return request.payload.logged_in_with;
  }
  if (request.auth.credentials) {
    return request.auth.credentials.app;
  }
  return 'n.a';
}

function postLog(username, logObj) {
  logObj.timestamp = new Date().toISOString();
  fetch(`${serviceUrl}/log/logs/${username}`, {
    method: 'post',
    body: JSON.stringify(logObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(console.log(`Logging event was sent for user ${username}`))
    .catch((err) => console.error(err));
}

async function checkLoggingActive(username) {
  const user = await pgHelper.getUserAllData(username);
  return user && user.role === 'Proband' && !!user.logging_active;
}
