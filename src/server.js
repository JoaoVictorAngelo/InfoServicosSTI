const express = require("express");
const cors = require("cors");
const path = require("path");
const { requestLogger, notFound, errorHandler } = require("./middleware/errorHandler");
const tecnicosRoutes = require("./routes/tecnicos");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(requestLogger);


app.use(express.static(path.join(__dirname, "../../frontend")));


app.use("/api/tecnicos", tecnicosRoutes);

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "STI API REST - Funcionando!",
    version: "1.0.0",
    endpoints: {
      tecnicos: {
        "GET /api/tecnicos": "Lista todos os técnicos (query: ?estado=)",
        "GET /api/tecnicos/:id": "Busca técnico por ID",
        "GET /api/tecnicos/estados/lista": "Lista estados disponíveis",
        "POST /api/tecnicos/agendar": "Realiza agendamento de técnico"
      }
    }
  });
});


app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "../../frontend/index.html"));
  }
});


app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {

  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
