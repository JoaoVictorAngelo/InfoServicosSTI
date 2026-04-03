Projeto Integrado - STI
Esse projeto foi desenvolvido como projeto integrado do curso de Análise e Desenvolvimento de sistemas. O site é ficticio e utiliza como imagem a empresa STI que trabalha com rastreamento e telemetria de veículos.
O que é o projeto
É um site com 3 páginas (Início, Produtos e Técnicos) conectado a uma API feita em Node.js com Express. A página de técnicos busca os dados direto da API e também permite fazer agendamentos.
Tecnologias usadas

HTML, CSS e JavaScript no frontend
Node.js com Express no backend
API REST

Como rodar
Primeiro precisa ter o Node.js instalado na máquina.
Depois é só entrar na pasta do backend e instalar as dependências:
cd backend
npm install
E rodar o servidor:
npm start
O site vai abrir em: http://localhost:3000
Estrutura das pastas
sti-projeto/
├── backend/
│   └── src/
│       ├── server.js
│       ├── controllers/
│       ├── routes/
│       ├── data/
│       └── middleware/
├── frontend/
│   ├── index.html
│   ├── produtos.html
│   ├── tecnicos.html
│   └── images/
└── README.md
Endpoints da API
MétodoRotaDescriçãoGET/api/tecnicoslista todos os técnicosGET/api/tecnicos/:idbusca um técnico pelo idGET/api/tecnicos?estado=filtra por estadoGET/api/tecnicos/estados/listalista os estados disponíveisGET/api/tecnicos/resumomostra estatísticas geraisGET/api/tecnicos/agendamentoslista os agendamentos feitosPOST/api/tecnicos/agendarrealiza um agendamento
Observações

Os dados dos técnicos são fictícios
Os agendamentos ficam salvos enquanto o servidor estiver rodando, não tem banco de dados
O Express já serve o frontend automaticamente, não precisa abrir os arquivos HTML separado
