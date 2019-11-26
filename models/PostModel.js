//-----------------------------------------------------//
//                     POST MODEL                      //
//-----------------------------------------------------//
// Defines the structure/schema of the post collection.//
//-----------------------------------------------------//

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

postSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
postSchema.set('toJSON', {
    virtuals: true
});

postSchema.findById = function (cb) {
    return this.model('Posts').find({ id: this.id }, cb);
};

const Post = mongoose.model('Posts', postSchema);

exports.findById = (id) => {
    return Post.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createPost = (postData) => {
    const post = new Post(postData);
    return post.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Post.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, posts) {
                if (err) {
                    reject(err);
                } else {
                    resolve(posts);
                }
            })
    });
};

exports.patchPost = (id, postData) => {
    return new Promise((resolve, reject) => {
        Post.findById(id, function (err, post) {
            if (err) reject(err);
            for (let i in postData) {
                post[i] = postData[i];
            }
            post.save(function (err, updatedpost) {
                if (err) return reject(err);
                resolve(updatedpost);
            });
        });
    })
};

exports.removeById = (postId) => {
    return new Promise((resolve, reject) => {
        Post.deleteOne({ _id: postId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

