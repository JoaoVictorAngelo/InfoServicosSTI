const express = require("express");
const router = express.Router();
const {
  getTecnicos,
  getTecnicoById,
  getEstados,
  getResumo,
  agendarTecnico,
  getAgendamentos
} = require("../controllers/tecnicosController");


router.get("/", getTecnicos);


router.get("/estados/lista", getEstados);


router.get("/resumo", getResumo);


router.get("/agendamentos", getAgendamentos);

router.get("/:id", getTecnicoById);

router.post("/agendar", agendarTecnico);

module.exports = router;
