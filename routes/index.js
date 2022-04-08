var express = require('express');
const { HomePage, insert, closeTask, updateTask, removeTask } = require('../controllers/MainController');
var router = express.Router();

/* GET home page. */
router.get('/',HomePage)
router.post('/',insert)

router.get('/close/:id',closeTask)
router.post('/update/:id',updateTask)
router.get('/remove/:id',removeTask)

module.exports = router;
