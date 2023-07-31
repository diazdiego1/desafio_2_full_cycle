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

function getLastInsertedRecord() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, nome FROM people ORDER BY id DESC LIMIT 1`;
    connection.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      }
      if (results.length === 0) {
        return resolve(null);
      }
      const { id, nome } = results[0];
      resolve({ id, nome });
    });
  });
}

async function init() {
  try {
    await createTable();
    console.log('Servidor MySQL pronto!');
  } catch (error) {
    console.error('Erro ao criar tabela:', error);
  }
}

// Chamar a função init() com await aqui
(async () => {
  await init();
  app.listen(port, () => {
    console.log('Rodando na porta ' + port);
  });
})();

app.get('/', async (req, res) => {
  try {
    const nome = 'Diaz Diego';
    
    await insertData(nome);
    
    const record = await getLastInsertedRecord();
    
    if (!record) {
      return res.status(404).send('Nenhum registro encontrado');
    }
    
    res.send(`
      <h1>Full Cycle</h1>
      <h2>O último registro incluído no banco foi:</h2> 
      <h2>ID: ${record.id}</h2>
      <h2>Nome: ${record.nome}</h2>
    `);
  } catch (error) {
    res.status(500).send('Erro ao processar a requisição');
  }
});