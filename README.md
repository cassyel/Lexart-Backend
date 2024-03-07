# Lexart Backend API Documentation

## Introdução
Bem-vindo à documentação da API Lexart Backend. Esta API foi construída utilizando o padrão Model-Service-Controller, seguindo uma estrutura orientada a classes para manter um código bem estruturado e de fácil manutenção. Todos os endpoints possuem validações para os dados inseridos pelos usuários.

## Tecnologias Utilizadas

- **Express:** Framework web para Node.js.
- **Node:** Ambiente de execução JavaScript no lado do servidor.
- **TypeScript:** Superset tipado para JavaScript, utilizado para adicionar tipagem estática ao código.
- **Joi Validator:** Biblioteca para validação de dados em JavaScript/TypeScript.
- **Class-validator:** Biblioteca para validação de classes em JavaScript/TypeScript.
- **Sequelize:** ORM (Object-Relational Mapping) para interação com bancos de dados relacionais.
- **JWT (JSON Web Token):** Método para representar reivindicações entre duas partes de forma compacta e segura.
- **ESLint:** Ferramenta de linting para manter o código consistente e identificar problemas potenciais.

## Rotas Públicas

### 1. [GET] /
- **Descrição:** Retorna uma mensagem indicando que você acessou o Lexart Backend.

### 2. [POST] /register
- **Descrição:** Rota para registrar um novo usuário.

### 3. [POST] /login
- **Descrição:** Rota para autenticar um usuário.

### 4. [GET] /external-auth
- **Descrição:** Gera um token de acesso externo.

## Rotas Externas (Gere o token [aqui](external-auth) e passe no header "external-auth" para ter acesso aos endpoints externos)

### 5. [POST] /external/product
- **Descrição:** Cria um novo produto (requer autenticação externa).

### 6. [GET] /external/products
- **Descrição:** Retorna todos os produtos (requer autenticação externa).

### 7. [GET] /external/product/:id
- **Descrição:** Retorna um produto específico por ID (requer autenticação externa).

## Rotas Autenticadas

**Nota:** As rotas a seguir requerem autenticação JWT.

### 8. [POST] /product
- **Descrição:** Cria um novo produto.

### 9. [GET] /products
- **Descrição:** Retorna todos os produtos.

### 10. [GET] /product/:id
- **Descrição:** Retorna um produto específico por ID.

### 11. [PATCH] /product
- **Descrição:** Atualiza um produto existente.

### 12. [DELETE] /product/:id
- **Descrição:** Deleta um produto existente.

### 13. [POST] /product/variant
- **Descrição:** Cria uma nova variante de produto.

### 14. [PATCH] /product/variant
- **Descrição:** Atualiza uma variante de produto existente.

### 15. [DELETE] /product/variant/:id
- **Descrição:** Deleta uma variante de produto existente.

---
[Documentação gerada pelo postman](https://documenter.getpostman.com/view/30843088/2sA2xe4Zu2)

**Observação:** Certifique-se de incluir o token de autenticação JWT nas chamadas para as rotas autenticadas.
