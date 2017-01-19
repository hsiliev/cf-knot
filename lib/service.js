const debug = require('debug')('cf-knot:connection');

const getConnectionInfo = () => {
  if (!process.env.VCAP_SERVICES)
    throw new Error('No service environment found');

  const env = JSON.parse(process.env.VCAP_SERVICES);
  debug('Environment %o', env);
  const serviceName = Object.keys(env)[0];
  if (!serviceName)
    throw new Error('No MySQL DB bound');

  const instanceConfig = env[serviceName][0];
  debug('Using DB instance %o', instanceConfig);
  const credentials = instanceConfig.credentials;
  return {
    host: credentials.hostname,
    port: credentials.port,
    user: credentials.username,
    password: credentials.password,
    database: credentials.name
  };
};

module.exports.getConnectionInfo = getConnectionInfo;