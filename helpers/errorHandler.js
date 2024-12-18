
const errorMessages = require('./errorMessages').errors;

const errorHandler = (err, req, res, next) => {
  const messageKey = err.messageKey || 'error.internal_server';
  console.log(err);
  const errorResponse = errorMessages[messageKey] || {
    httpStatus: 500,
    translations: {
      en: 'Internal server error',
      fr: 'Erreur interne du serveur'
    }
  };

  res.status(errorResponse.httpStatus).json(errorResponse);
};

module.exports = errorHandler;