const express = require('express');
const transactionRouter = express.Router();
const service = require('../services/transactionService');

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
    const filteredTransactions = await service.getTransactionFrom(period);

    response.send({ length: filteredTransactions.length, transaction: filteredTransactions })
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
    const { description, value, category, year, month, day, type } = body;
    const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
    const yearMonthDay = `${yearMonth}-${day.toString().padStart(2, '0')}`;
    const postTransaction = {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    }
    const newTransaction = await service.postTransaction(postTransaction);

    response.send({ status: 'OK', newTransaction, });
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });

  }
}

);

transactionRouter.put('/', async (request, response) => {

  try {

    throw new Error(`Necessário informar um id para o lançamento`);
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });

  }

}
);

transactionRouter.put('/:id', async (request, response) => {
  const { body, params } = request;

  try {

    if (JSON.stringify(body) === '{}') {
      throw new Error(`Conteudo Inexistente`);
    }

    const { description, value, category, year, month, day, type } = body;
    const { id } = params;
    const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
    const yearMonthDay = `${yearMonth}-${day.toString().padStart(2, '0')}`;
    const updateTransaction = {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    };
    const updatedTransaction = await service.updateTransaction(id, updateTransaction);

    response.send({ status: 'OK', transaction: updatedTransaction, });
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });

  }
}
);

transactionRouter.delete('/', async (request, response) => {

  try {

    throw new Error('Necessário informar um id para exclusão de lançamento');
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });

  }

}
);

transactionRouter.delete('/:id', async (request, response) => {
  const { params } = request;

  try {
    const { id } = params;

    const didDelete = await service.deleteTransaction(id);

    if (didDelete) {
      response.send({
        status: 'ok',
        message: `Lançamento de id ${id} excluído com sucesso!`,
      });
    } else {
      throw new Error(`Não foi possível excluir`);
    }
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });
  }
});


module.exports = transactionRouter;
