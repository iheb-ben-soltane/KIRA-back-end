const errorHandler = (err, req, res, next) => {
    console.error(err.stack);// to handle
  
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
      success: false,
      messageKey: err.messageKey || 'error.internal_server', // Envoi de la clé de message
    });
    
  };
  
  module.exports = errorHandler;