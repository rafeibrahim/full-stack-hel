const _ = require('lodash');

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
    return previousBlog.likes > currentBlog.likes ? previousBlog : currentBlog;
  };

  return blogs.length === 0 ? null : blogs.reduce(reducer);
};

const mostBlogs = (blogs) => {
  const authorArray = _.map(blogs, 'author');
  console.log('authorArray', authorArray);
  const uniqueAuthorArray = [...new Set(authorArray)];
  console.log('uniqueAuthorArray', uniqueAuthorArray);
  const arrayWithAuthorRobert = _.filter(blogs, (blog) => {
    return blog.author === 'Robert C. Martin';
  });
  console.log('arrayWithAuthorRobert', arrayWithAuthorRobert);
  const arrayWithAuthorandBlogTotal = _.map(uniqueAuthorArray, (authorName) => {
    arrayForAuthor = _.filter(blogs, (blog) => {
      return blog.author === authorName;
    });
    return {
      author: authorName,
      blogs: arrayForAuthor.length,
    };
  });
  console.log('arrayWithAuthorandBlogTotal', arrayWithAuthorandBlogTotal);
  const sortedArrayWithAuthorandBlogTotal = _.orderBy(
    arrayWithAuthorandBlogTotal,
    ['blogs'],
    ['desc']
  );
  console.log('sortedArrayWithAuthorandBlogTotal', sortedArrayWithAuthorandBlogTotal);
  return sortedArrayWithAuthorandBlogTotal.length === 0 ? null : sortedArrayWithAuthorandBlogTotal[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
