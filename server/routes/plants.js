const express = require('express');
const router = express.Router();

const plantsController = require('../controllers/plants.controller');

router
  .route('/plants')
  .get(plantsController.plant_list);

router
  .route('/plant')
  .post(plantsController.plant_create);

router
  .route('/plant/:id')
  .get(plantsController.plant_detail)
  .delete(plantsController.plant_delete)
  .put(plantsController.plant_update);

module.exports = router;