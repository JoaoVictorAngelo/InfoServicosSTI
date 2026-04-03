
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Rota ${req.originalUrl} não encontrada.`
  });
};


const errorHandler = (err, req, res, next) => {
  console.error("Erro interno:", err.message);
  res.status(500).json({
    success: false,
    message: "Erro interno do servidor.",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
};

module.exports = { requestLogger, notFound, errorHandler };
