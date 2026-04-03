const tecnicos = require("../data/tecnicos");


const agendamentos = [];


const getTecnicos = (req, res) => {
  const { estado } = req.query;
  const resultado = [];


  for (let i = 0; i < tecnicos.length; i++) {
    const tecnico = tecnicos[i];

    if (estado) {
  
      if (tecnico.estado.toLowerCase() === estado.toLowerCase()) {
        resultado.push(tecnico);
      }
    } else {
      resultado.push(tecnico);
    }
  }

  return res.json({
    success: true,
    total: resultado.length,
    data: resultado
  });
};


const getTecnicoById = (req, res) => {
  const id = parseInt(req.params.id);
  let tecnicoEncontrado = null;
  let i = 0;


  while (i < tecnicos.length && tecnicoEncontrado === null) {
    if (tecnicos[i].id === id) {
      tecnicoEncontrado = tecnicos[i];
    }
    i++;
  }

  if (!tecnicoEncontrado) {
    return res.status(404).json({
      success: false,
      message: `Técnico com id ${id} não encontrado.`
    });
  }

  return res.json({
    success: true,
    data: tecnicoEncontrado
  });
};


const getEstados = (req, res) => {
  const estados = []; 

  for (let i = 0; i < tecnicos.length; i++) {
    const estado = tecnicos[i].estado;


    if (!estados.includes(estado)) {
      estados.push(estado);
    }
  }


  estados.sort();

  return res.json({
    success: true,
    data: estados
  });
};


const getResumo = (req, res) => {
  let totalDisponiveis = 0;
  let totalIndisponiveis = 0;
  const resumoPorEstado = []; 

  for (let i = 0; i < tecnicos.length; i++) {
    const t = tecnicos[i];


    if (t.disponivel) {
      totalDisponiveis++;
    } else {
      totalIndisponiveis++;
    }


    let entradaEstado = null;
    let j = 0;
    while (j < resumoPorEstado.length) {
      if (resumoPorEstado[j].estado === t.estado) {
        entradaEstado = resumoPorEstado[j];
        break;
      }
      j++;
    }


    if (entradaEstado === null) {
      resumoPorEstado.push({
        estado: t.estado,
        total: 1,
        disponiveis: t.disponivel ? 1 : 0
      });
    } else {

      entradaEstado.total++;
      if (t.disponivel) entradaEstado.disponiveis++;
    }
  }

  return res.json({
    success: true,
    data: {
      totalTecnicos: tecnicos.length,
      totalDisponiveis,
      totalIndisponiveis,
      porEstado: resumoPorEstado
    }
  });
};


const agendarTecnico = (req, res) => {
  const { tecnicoId, clienteNome, clienteTelefone, descricao, data } = req.body;


  const camposObrigatorios = ["tecnicoId", "clienteNome", "clienteTelefone"];
  const camposFaltando = [];

  for (let i = 0; i < camposObrigatorios.length; i++) {
    if (!req.body[camposObrigatorios[i]]) {
      camposFaltando.push(camposObrigatorios[i]);
    }
  }

  if (camposFaltando.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Campos obrigatórios ausentes: ${camposFaltando.join(", ")}.`
    });
  }


  const idBuscado = parseInt(tecnicoId);
  let tecnico = null;
  let i = 0;

  while (i < tecnicos.length) {
    if (tecnicos[i].id === idBuscado) {
      tecnico = tecnicos[i];
      break;
    }
    i++;
  }

  if (!tecnico) {
    return res.status(404).json({
      success: false,
      message: `Técnico com id ${tecnicoId} não encontrado.`
    });
  }

  if (!tecnico.disponivel) {
    return res.status(409).json({
      success: false,
      message: `O técnico ${tecnico.nome} não está disponível no momento.`
    });
  }


  const novoAgendamento = {
    id: Date.now(),
    tecnico: tecnico.nome,
    tecnicoId: tecnico.id,
    clienteNome,
    clienteTelefone,
    descricao: descricao || "Sem descrição",
    data: data || new Date().toISOString().split("T")[0],
    status: "agendado",
    criadoEm: new Date().toISOString()
  };

  agendamentos.push(novoAgendamento);

  return res.status(201).json({
    success: true,
    message: "Agendamento realizado com sucesso!",
    totalAgendamentos: agendamentos.length,
    data: novoAgendamento
  });
};


const getAgendamentos = (req, res) => {

  const lista = [];

  for (let i = 0; i < agendamentos.length; i++) {
    lista.push(agendamentos[i]);
  }

  return res.json({
    success: true,
    total: lista.length,
    data: lista
  });
};

module.exports = {
  getTecnicos,
  getTecnicoById,
  getEstados,
  getResumo,
  agendarTecnico,
  getAgendamentos
};
