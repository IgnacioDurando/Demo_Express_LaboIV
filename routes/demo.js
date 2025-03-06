const { Router } = require('express');
const { getAlquileres, getNovedades, getInteriores } = require('../controllers/demo');

const Rutas = Router();

Rutas.get('/alquileres/', getAlquileres)

Rutas.get('/novedades/', getNovedades)

Rutas.get('/interiores/', getInteriores)

module.exports = Rutas;