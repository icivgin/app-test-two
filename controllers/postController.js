/**
 * Post Controller
 */

'use strict'

const postService = require('../services/postService')

const postController = {}

/**
 * Get all posts
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
postController.getAll = async (req, res) => {
    postService.getAll()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(404).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}

postController.createPost = async (req, res) => {
    postService.createPost(req.body)
        .then(data => res.json(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while posting data.'
            })
        });
}

postController.deletePosts = async (req, res) => {
    postService.deletePosts()
        .then(data => res.json(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while deleting data.'
            })
        });
}

module.exports = postController