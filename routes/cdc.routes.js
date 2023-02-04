const router = require('express').Router();
const cdcController = require('../controllers/cdc.controller');
const {checkIsAuth} = require('../middlewares/auth.middleware');

// This function returns the CDCs for a given ISBN
// It requires the user to be authenticated
// It requires the ISBN to be passed as a parameter
router.get('/:isbn', checkIsAuth, cdcController.getCDCs);

// This function creates a new CDC (Center for Disease Control) in the database.
// It is called by the POST method of the CDC route.
// The CDC controller is imported at the top of the file.
router.post('/', checkIsAuth, cdcController.createCDC);

//The CDCController.updateCDC function is called when a PATCH request is sent to the '/cdc' endpoint.
//The checkIsAuth middleware is called first to ensure that the user is authenticated.
router.patch('/', checkIsAuth, cdcController.updateCDC);

// Delete a CDC.
router.delete('/:cdcId', checkIsAuth, cdcController.deleteCDC);

module.exports = router;
