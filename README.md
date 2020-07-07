# deliverymuch-challenge

A API possui apenas um endpoint GET (/recipes/), o qual deve receber os ingredientes da receita pelo query parameter "i".

É usado o localhost na porta 3003 para atender as requisições da API.

As funções que coletam dados das APIs da Recipe Puppy e do GIPHY estão em funções separadas no arquivo helpers/recipe.js.

O único controlador da API está em controllers/recipe.js, o qual possui o único endpoint GET.

O arquivo api.rest contém testes para a API da Recipe Puppy e do GIPHY, além do teste da API implementada no desafio. O arquivo é utilizado pela extensão "REST Client" do Visual Studio Code, que é uma espécie de Postman/Insomnia embutido na IDE.

A chave de acesso para a API da GIPHY está no arquivo .env, o qual é usado pela biblioteca dotEnv, que usei para gerenciar essa única variável de ambiente.

Ainda falta o deploy com Docker, o qual não tenho prática de como fazer, e que terei que aprender.
