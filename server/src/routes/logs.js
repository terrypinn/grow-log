const express = require('express');
const router = express.Router();

const logsController = require('../controllers/logs.controller');

router
  .route('/plant/:plant_id/logs')
  .get(logsController.log_list);

router
  .route('/log')
  .post(logsController.log_create);

router
  .route('/log/:id')
  .get(logsController.log_detail)
  .delete(logsController.log_delete)
  .put(logsController.log_update);

module.exports = router;