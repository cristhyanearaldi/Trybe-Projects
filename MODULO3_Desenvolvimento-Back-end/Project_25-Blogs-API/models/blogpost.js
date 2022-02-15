const BlogPost = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, { timestamps: false });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return BlogPosts;
};

module.exports = BlogPost;