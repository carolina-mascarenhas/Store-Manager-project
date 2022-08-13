# Projeto Store Manager

Neste projeto desenvolvi uma API utilizando a arquitetura MSC. Trata-se de um sistema de gerenciamento de vendas em que é possível criar, visualizar, deletar e atualizar produtos e vendas.

O banco de dados para a gestão dos dados é o MySQL.

Os testes unitários de cada camada encontram-se na pasta `test/unit`.

## Orientações

1. Clone o repositório

  - `git clone git@github.com:carolina-mascarenhas/Store-Manager-project.git`;

  - Entre na pasta do repositório que você acabou de clonar:
    - `cd Store-Manager-project`
    
2. Instale as dependências

  - `npm install`
  
### Rodando no Docker vs Localmente

> Com Docker

Rode os serviços `node` e `db` com o comando `docker-compose up -d`.

Esses serviços irão inicializar um container chamado `store_manager` e outro chamado `store_manager_db`;

A partir daqui você pode rodar o container `store_manager` com o comando `docker exec -it store_manager bash`.

Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

> Sem Docker

Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
