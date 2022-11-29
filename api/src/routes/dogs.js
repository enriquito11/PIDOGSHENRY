const { Router } = require('express');
const db = require('../db');
const router = Router();
const { getBreedsApiDbName, getBreedsID, postCreatedBreed, deleteDogs} = require('../Controllers/DogsApiDb')

router.get('/', getBreedsApiDbName)

router.get('/:id', getBreedsID)

router.post('/', postCreatedBreed)

router.delete('/', deleteDogs)
    

module.exports = router;