const apiProtocall = 'http';
// apiProtocall : 'http',
const apiUrl = 'localhost';
const apiPort = '5000'; //'8080';

const apiTimeOut = 10000;

const constantparameters = {
  apiUrlWithPort:
    apiPort === '80' || !apiPort
      ? `${apiProtocall}://${apiUrl}`
      : `${apiProtocall}://${apiUrl}:${apiPort}`,
  apiTimeOut,
};

module.exports = constantparameters;
