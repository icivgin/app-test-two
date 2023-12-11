/**
 * Post Service
 */

'use strict'

const models = require("../db/models")

const postService = {}

/**
 * Get all posts
 */
postService.getAll = async () => {
    return models.Post.findAndCountAll({
        order: [
            ['id', 'ASC'],
        ],
    })
}

postService.createPost = async (body) => {
    return models.Post.create({
        title: body.title,
        message: body.message
    })
}

postService.deletePosts = async () => {
    return models.Post.destroy({
        where: {},
        truncate: true
    })
}

module.exports = postService