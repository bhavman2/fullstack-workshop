const express = require('express')
const controller = require('./controller.js')
const router = express.Router()


router
  .route('/todo')
  .post(controller.post)
  .get(controller.get)
  .put(controller.put)
  .delete(controller.delete);

module.exports = router