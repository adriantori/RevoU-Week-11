"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPostListController = exports.deletePostController = exports.updatePostController = exports.getPostsController = exports.createPostController = void 0;
const postService_1 = require("../services/postService");
function createPostController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { postTitle, postBody } = req.body;
        try {
            const userId = res.locals.userId;
            const post = yield (0, postService_1.createPostService)(postTitle, postBody, userId);
            res.status(201).json({
                message: 'Posted successfully',
                data: post,
            });
        }
        catch (error) {
            console.log("error createPost controller");
            res.status(500).json({ message: 'Error creating post' });
        }
    });
}
exports.createPostController = createPostController;
function getPostsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield (0, postService_1.getPostsService)();
            res.status(200).json({
                message: 'Posts retrieved successfully',
                data: post,
            });
        }
        catch (error) {
            console.log("error createPost controller");
            res.status(500).json({ message: 'Error retrieving posts' });
        }
    });
}
exports.getPostsController = getPostsController;
function getUserPostListController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.params.username;
        try {
            if (username == res.locals.username) {
                const post = yield (0, postService_1.getUserPostListService)(username);
                res.status(200).json({
                    message: 'Posts retrieved successfully',
                    data: post,
                });
            }
            else {
                res.status(401).json({ message: `You can't see other people's posts, yet.` });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving post lists!' });
        }
    });
}
exports.getUserPostListController = getUserPostListController;
function updatePostController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { postTitle, postBody, postId } = req.body;
        try {
            const userId = res.locals.userId;
            const post = yield (0, postService_1.updatePostService)(postTitle, postBody, userId, postId);
            res.status(200).json({
                message: 'Post updated successfully',
                data: post,
            });
        }
        catch (error) {
            console.log("error updatePost controller");
            res.status(500).json({ message: 'Error updating post' });
        }
    });
}
exports.updatePostController = updatePostController;
function deletePostController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { postId } = req.body;
        console.log(postId);
        try {
            const post = yield (0, postService_1.deletePostService)(postId);
            res.status(201).json({
                message: 'Post deleted successfully',
                data: post,
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting post' });
        }
    });
}
exports.deletePostController = deletePostController;
