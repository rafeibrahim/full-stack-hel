const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
    const reducer = (previousBlog, currentBlog) => {
        return previousBlog.likes > currentBlog.likes ? previousBlog : currentBlog
    }

    return blogs.length === 0 ? null : blogs.reduce(reducer)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
