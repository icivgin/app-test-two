/**
 * Post routes.
 */

'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controllers/postController');

router.get('/posts', controller.getAll);
router.post('/posts', controller.createPost);
router.get('/posts/delete', controller.deletePosts);

module.exports = router;