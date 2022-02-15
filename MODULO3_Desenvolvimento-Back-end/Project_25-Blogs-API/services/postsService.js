const { BlogPost, User, Category } = require('../models');

const create = async ({ title, content, id }) => {
  const newPost = await BlogPost.create({ title, content, userId: id });

  return newPost;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });

  return posts;
};

const getById = async ({ id }) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });

  return post;
};

const update = async (id, title, content) => {
  await BlogPost.update(
    { title, content },
    { where: { id } },  
  );

  const updatedPost = await BlogPost.findByPk(id, {
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return updatedPost;
};

const remove = async (userId, id) => {
  const deletedPost = await BlogPost.destroy(
    { where: { userId, id } },
  );

  return deletedPost;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};