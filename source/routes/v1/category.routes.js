import express from 'express';

import categoryController from '../../controllers/category.controller.js';
import makeCallback from '../../utils/handleCb.js';
// import { protect, checkingRole } from '../../middlewares/index.js';

const router = express.Router();

router
  .post('/add', makeCallback(categoryController.add))
  .get('/list', makeCallback(categoryController.list))
  .put('/update/:id', makeCallback(categoryController.update))
  .put('/toggle-isactive/:id', makeCallback(categoryController.toggleIsActive))
  .delete('/remove/:id', makeCallback(categoryController.remove));

export default router;
