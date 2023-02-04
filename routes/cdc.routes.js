const router = require('express').Router();
const cdcController = require('../controllers/cdc.controller');
const {checkIsAuth} = require('../middlewares/auth.middleware');

//User
router.get('/:isbn', checkIsAuth, cdcController.getCDCs);
router.post('/', checkIsAuth, cdcController.createCDC);
router.patch('/', checkIsAuth, cdcController.updateCDC);
router.delete('/:cdcId', checkIsAuth, cdcController.deleteCDC);

module.exports = router;
