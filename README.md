# 2º Desafio do curso Full Cycle.

Objetivo: O desafio consiste em criar uma rede de containers com um servidor Nginx que atua como proxy para acessar uma página web simples, desenvolvida em Node.js. A página web em Node.js possui duas funções principais: inserir registros em um banco de dados MySQL e exibir o último registro criado.

  ![Diagrama sem nome drawio](https://github.com/diazdiego1/desafio-nginx_node_mysql-full-cycle/assets/140215970/b9de7b85-5aac-4a7c-9d03-699c87a40401)

1. Proxy Nginx:
       - Funciona como intermediário entre os clientes e o servidor Node.js.
       - Encaminha as solicitações do cliente para o servidor Node.js.
       - Redireciona as respostas do servidor Node.js para o cliente.

2. Servidor Node.js:
      - Responsável por atender as requisições dos clientes.
      - Possui duas principais funcionalidades:
           * Inserir registros em um banco de dados MySQL;
           * Exibir o último registro criado no banco.
    
3. Inserção de Registros no Banco de Dados:
      - Quando uma requisição é recebida pelo servidor Node.js, ele insere um novo registro na tabela "people" do banco de dados MySQL.
      - Os dados inseridos são compostos por um "id" (gerado automaticamente pelo banco) e um "nome".

4. Exibição do Último Registro Criado:
      - Após a inserção do registro, o servidor Node.js consulta o banco de dados para obter o último registro criado na tabela "people".
      - O "id" e o "nome" do último registro são recuperados e armazenados temporariamente.
      - O servidor responde à requisição do cliente, exibindo uma página HTML com o título "Full Cycle" e a informação do "último registro criado", contendo o "id" e o "nome" do registro.
      - Essas são as principais funcionalidades da página desenvolvida no desafio do curso Full Cycle. O Nginx atua como intermediário, direcionando as requisições para o servidor Node.js, que, por sua vez, gerencia a inserção de registros no banco de dados e exibe a informação do último registro na página web.

        ![image](https://github.com/diazdiego1/desafio-nginx_node_mysql-full-cycle/assets/140215970/d0e3152f-f891-4d31-9b28-338ed4d6a452)

### Como estruturar o seu projeto para que tudo funcione corretamente:
Para que o projeto funcione corretamente com base no arquivo docker-compose.yml fornecido, a estrutura do projeto deve ser organizada da seguinte forma:
```
desafio-nginx_node_mysql-full-cycle/
├── docker-compose.yml
├── node/
│   ├── dockerfile.prd
│   └── index.js
├── nginx/
│   ├── dockerfile.prd
│   └── node.conf
└── mysql/
    ├── (outros arquivos relacionados ao MySQL)
```
1.  Diretório Raiz:

      - docker-compose.yml: O arquivo que define a configuração dos serviços Docker e suas interações.
    
2. Diretório node:

     - dockerfile.prd: O arquivo Dockerfile para criar a imagem do aplicativo Node.js.
     - index.js: O código do aplicativo Node.js que será executado pelo contêiner.
     - Outros arquivos do aplicativo Node.js (se houver).

3. Diretório nginx:

     - dockerfile.prd: O arquivo Dockerfile para criar a imagem do servidor Nginx.
     - node.conf: O arquivo de configuração do Nginx para definir o proxy reverso para o aplicativo Node.js.
     - Outros arquivos de configuração do Nginx (se houver).

4. Diretório mysql:

     - Aqui você pode criar um diretório para armazenar os arquivos relacionados ao banco de dados MySQL, como os dados do banco de dados, arquivos de configuração etc.

Certifique-se de que todos os arquivos e diretórios estejam localizados na mesma pasta raiz que o arquivo docker-compose.yml. Dessa forma, o Docker Compose poderá localizar todos os recursos corretamente e executar o projeto conforme o arquivo de configuração.
