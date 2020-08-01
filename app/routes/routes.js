const express = require('express');
const transactionRouter = express.Router();


transactionRouter.get('/', async (request, response) => {
  const { query } = request;

  try {
    if (!query.period) {
      throw new Error(
        `É nescessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm`);
    }
    response.send({ length: 2, transaction: ['transaction1', 'transaction2'] })
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });

  }
})
module.exports = transactionRouter;
