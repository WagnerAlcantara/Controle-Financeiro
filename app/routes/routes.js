const express = require('express');
const transactionRouter = express.Router();


transactionRouter.get('/', async (request, response) => {
  const { query } = request;

  try {
    if (!query.period) {
      throw new Error(
        `É nescessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm`);
    }
    const { period } = query;
    if (period.length !== 7) {
      throw new Error(`Period, use o formato yyyy-mm`);
    }
    //Mongo DB
    response.send({ length: 2, transaction: ['transaction1', 'transaction2'] })
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });

  }
});

transactionRouter.post('/', async (request, response) => {
  const { body } = request;

  try {
    if (JSON.stringify(body) === '{}') {
      throw new Error(`Conteudo Inexistente`);
    }

    //Mongo DB
    response.send({ status: 'OK' });
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });

  }
}
)
transactionRouter.put('/:id', async (request, response) => {
  const { body, params } = request;

  try {

    if (JSON.stringify(body) === '{}') {
      throw new Error(`Conteudo Inexistente`);
    }

    //Mongo DB
    response.send({ status: 'OK' });
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });

  }
}
)
module.exports = transactionRouter;
