const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const error = {
    status: err.status || 500,
    message:
      process.env.NODE_ENV === "production"
        ? "Ha ocurrido un error en el servidor"
        : err.message,
  };

  if (err.name === "ValidationError") {
    error.status = 400;
    error.message = "Error de validación en los datos enviados";
  }

  if (err.code === 11000) {
    error.status = 400;
    error.message = "Ya existe un registro con esos datos";
  }

  if (process.env.NODE_ENV === "production") {
    // Aquí podrías implementar un sistema de logging
    console.error(new Date().toISOString(), err);
  }

  res.status(error.status).json({
    success: false,
    error: error.message,
  });
};

module.exports = errorHandler;
