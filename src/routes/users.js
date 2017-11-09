const router = require('express').Router();
const UsersController = require('../controllers/users');
const UserModel = require('../models/user');

const departmentsController = new UsersController(UserModel);

router.get('/', (req, res) => departmentsController.getAll(req, res));
router.get('/page/:page', (req, res) => departmentsController.getAll(req, res));
router.get('/:id', (req, res) => departmentsController.getById(req, res));
router.post('/', (req, res) => departmentsController.create(req, res));
router.put('/:id', (req, res) => departmentsController.update(req, res));
router.delete('/:id', (req, res) => departmentsController.destroy(req, res));

module.exports = router;
