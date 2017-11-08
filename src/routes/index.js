const router = require('express').Router();
const HomeController = require('../controllers/home');

const homeController = new HomeController();

router.get('/', (req, res) => homeController.index(req, res));

module.exports = router;
