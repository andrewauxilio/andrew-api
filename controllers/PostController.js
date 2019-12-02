/*
|--------------------------------------------------------------------------
| Post Controller
|--------------------------------------------------------------------------
|
| Here is where you can define functions for the post endpoints.
|
*/

const PostModel = require('../models/PostModel');

//Create Post Function
exports.insert = (req, res) => {
    PostModel.createPost(req.body)
        .then((result) => {
            res.status(201).send({ id: result._id });
        });
};

//Get All Posts
exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 3;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    PostModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

//Get A Certain Post By ID
exports.getById = (req, res) => {
    PostModel.findById(req.params.postId)
        .then((result) => {
            res.status(200).send(result);
        });
};

//Update A Post
exports.patchById = (req, res) => {
    PostModel.patchPost(req.params.postId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

//Delete A Post
exports.removeById = (req, res) => {
    PostModel.removeById(req.params.postId)
        .then((result) => {
            res.status(204).send({});
        });
};