const router = require('express').Router();
const HomeController = require('../controllers/home');
const DepartmentRouter = require('./departments');
const UserRouter = require('./users');

const homeController = new HomeController();

router.get('/', (req, res) => homeController.index(req, res));
router.use('/departments', DepartmentRouter);
router.use('/users', UserRouter);

module.exports = router;
