const express = require('express');
const covidRoutes = require('./server/covid/covid.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount covid routes at /covid
router.use('/covid', covidRoutes);

module.exports = router;
