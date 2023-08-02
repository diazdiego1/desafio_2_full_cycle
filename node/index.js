const express = require('express');
const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

app.use(express.urlencoded({ extended: true })); // Parsear o corpo das requisições como formulários

function createTable() {
  return new Promise((resolve, reject) => {
    const sql = `
      CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL
      )
    `;
    connection.query(sql, (error) => {
      if (error) {
        return reject(error);
      }
      console.log('Tabela criada com sucesso!');
      resolve();
    });
  });
}

function insertData(nome) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO people(nome) VALUES (?)`;
    connection.query(sql, [nome], (error, results) => {
      if (error) {
        return reject(error);
      }
      console.log('Inserção realizada com sucesso!');
      resolve();
    });
  });
}

function getAllRecords() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, nome FROM people`;
    connection.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}

async function init() {
  try {
    await createTable();
    console.log('Tabela criada com sucesso!');
    // Definir as rotas aqui, após a criação da tabela

    // Rota para exibir o formulário de inserção de nome e a lista de registros
    app.get('/', async (req, res) => {
      try {
        const records = await getAllRecords();

        if (records.length === 0) {
          return res.status(404).send('Nenhum registro encontrado');
        }

        const recordsList = records
          .map((record) => `<li>ID: ${record.id}, Nome: ${record.nome}</li>`)
          .join('');

        res.send(`
          <h1>Full Cycle</h1>
          <form action="/add" method="post">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome">
            <button type="submit">Adicionar</button>
          </form>
          <h2>Todos os registros incluídos no banco:</h2> 
          <ul>
            ${recordsList}
          </ul>
        `);
      } catch (error) {
        res.status(500).send('Erro ao processar a requisição');
      }
    });

    // Rota para receber o nome inserido e cadastrar no banco de dados
    app.post('/add', async (req, res) => {
      try {
        const nome = req.body.nome;
        await insertData(nome);
        res.redirect('/'); // Redirecionar para a rota principal após a inserção
      } catch (error) {
        res.status(500).send('Erro ao processar a requisição');
      }
    });

    app.listen(port, () => {
      console.log('Rodando na porta ' + port);
    });
  } catch (error) {
    console.error('Erro ao criar tabela:', error);
  }
}

// Chamar a função init() com await aqui
(async () => {
  await init();
})();
