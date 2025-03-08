const {
  createPostServices,
  likePostService,
  readPostServices,
  getPostUserServices,
  getPostServices,
  commentPostServices,
} = require("../services/postService");

exports.createPostControllers = async (req, res) => {
  let result = await createPostServices(req);
  return res.status(200).json(result);
};
exports.readPostControllers = async (req, res) => {
  let result = await readPostServices(req);
  return res.status(200).json(result);
};
exports.getPostControllers = async (req, res) => {
  let result = await getPostServices(req);
  return res.status(200).json(result);
};

exports.getPostUserControllers = async (req, res) => {
  let result = await getPostUserServices(req);
  return res.status(200).json(result);
};

exports.likePostControllers = async (req, res) => {
  let result = await likePostService(req);
  return res.status(200).json(result);
};

exports.commentPostControllers = async (req, res) => {
  let result = await commentPostServices(req);
  return res.status(200).json(result);
};
