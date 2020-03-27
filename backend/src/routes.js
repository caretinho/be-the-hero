const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router(); //passei a função Rotas para uma variavel 'routes'

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index); //Instanciando do OngController

routes.post('/ongs', OngController.create); //Instanciando do OngController

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index); 
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes; //aqui exportando uma variavel de dentro do arquivo
