const express = require('express');
const cors = require('cors');
const routes = require('./routes');//o './' pq é de um arquivo, se nao node julgaria ser pacote. E significa ser da mesma pasta, se nao usa '../' p voltar uma pasta

const app = express();

/**
 * Rotas e Recurso
 */
/**
 * Métodos HTTP:
 * GET: Buscar uma informação no back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */
/**
 * Tipos de parâmetros:
 * Query Params: Parametros nomeados enviados na rota após "?"(Filtros, paginação)
 * Route Params: Parametros utilizados para identificar recursos
 * Request Body: 
 */

app.use(cors());
app.use(express.json());
app.use(routes);



app.listen(3333);
