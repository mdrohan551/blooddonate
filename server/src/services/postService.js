const mongoose = require("mongoose");
const PostModel = require("../models/PostModel");
const userModel = require("../models/userModels");
const ObjectId = mongoose.Types.ObjectId;

const createPostServices = async (req) => {
  try {
    let user_id = new ObjectId(req.headers.user_id);

    let { post, image } = req.body;
    if (!post || !image) {
      return {
        status: "fail",
        message: "Post and Image are required",
      };
    }
    let newPost = await PostModel.create({
      post,
      image,
      UserID: user_id,
    });
    return {
      status: "success",
      message: "Post Uploaded successfully",
    };
  } catch (err) {
    return {
      status: "fail",
      message: `Unable to register user: ${err.message}`,
    };
  }
};

const readPostServices = async (req) => {
  try {
    let { postId } = req.params;
    let post = await PostModel.findById(postId);
    if (!post) {
      return { status: "fail", message: "Post not found" };
    }
    return {
      status: "success",
      message: "Post fetched successfully",
      data: post,
    };
  } catch (err) {
    return { status: "fail", message: `Error: ${err.message}` };
  }
};

const getPostServices = async (req) => {
  try {
    let posts = await PostModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "UserID",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          "user.password": 0,
          "user.otp": 0,
          "user.createdAt": 0,
          "user.updatedAt": 0,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    if (!posts.length) {
      return { status: "fail", message: "No posts found" };
    }

    return {
      status: "success",
      message: "Posts with user details fetched successfully",
      data: posts,
    };
  } catch (err) {
    return { status: "fail", message: `Error: ${err.message}` };
  }
};

const getPostUserServices = async (req) => {
  try {
    let userId;
    try {
      userId = new ObjectId(req.headers.user_id); // ✅ Ensure valid ObjectId
    } catch (e) {
      return { status: "fail", message: "Invalid user ID format" };
    }

    let data = await userModel.aggregate([
      { $match: { _id: userId } },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "UserID",
          as: "posts",
        },
      },
      {
        $project: {
          password: 0,
          otp: 0,
          createdAt: 0,
          updatedAt: 0,
          "posts.updatedAt": 0,
        },
      },
    ]);

    if (!data.length) {
      return {
        status: "fail",
        message: "User not found or no posts available",
      };
    }

    return {
      status: "success",
      message: "User and posts fetched successfully",
      data: data[0],
    };
  } catch (err) {
    return { status: "fail", message: `Error: ${err.message}` };
  }
};

const likePostService = async (req) => {
  try {
    let userId = new ObjectId(req.headers.user_id);
    let { postId } = req.params;

    let post = await PostModel.findById(postId);
    if (!post) {
      return { status: "fail", message: "Post not found" };
    }

    let isLiked = post.likes.includes(userId);
    if (isLiked) {
      // Unlike the post
      await PostModel.findByIdAndUpdate(postId, { $pull: { likes: userId } });
      return { status: "success", message: "Post unLiked" };
    } else {
      // Like the post
      await PostModel.findByIdAndUpdate(postId, {
        $addToSet: { likes: userId },
      });
      return { status: "success", message: "Post liked" };
    }
  } catch (err) {
    return { status: "fail", message: `Error: ${err.message}` };
  }
};

const commentPostServices = async (req, res) => {
  try {
    let userId = new ObjectId(req.headers.user_id);
    let { postId } = req.params;
    let { text } = req.body;

    if (!text) {
      return { status: "fail", message: "Comment text is required" };
    }

    let post = await PostModel.findById(postId);
    if (!post) {
      return { status: "fail", message: "Post not found" };
    }

    let newComment = { userID: userId, text: text, createdAt: new Date() };

    await PostModel.findByIdAndUpdate(postId, {
      $push: { comments: newComment },
    });

    return { status: "success", message: "Comment added successfully" };
  } catch (err) {
    return { status: "fail", message: `Error: ${err.message}` };
  }
};

module.exports = {
  createPostServices,
  likePostService,
  readPostServices,
  getPostUserServices,
  getPostServices,
  commentPostServices,
};
