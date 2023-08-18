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

const sortBlogsByAuthor = (blogs) => {
  const authorArray = _.map(blogs, 'author');
  // console.log('authorArray', authorArray);
  const uniqueAuthorArray = [...new Set(authorArray)];
  // console.log('uniqueAuthorArray', uniqueAuthorArray);
  // const arrayWithAuthorRobert = _.filter(blogs, (blog) => {
  //   return blog.author === 'Robert C. Martin';
  // });
  // console.log('arrayWithAuthorRobert', arrayWithAuthorRobert);
  const arrayWithAuthorBlogsLikes = _.map(uniqueAuthorArray, (authorName) => {
    arrayForAuthor = _.filter(blogs, (blog) => {
      return blog.author === authorName;
    });
    //console.log(arrayForAuthor, "arrayForAuthor");
    const likesForAuthor = arrayForAuthor.reduce((accumulator, blog) => {
      //console.log("accumulator", accumulator);
      const totalLikes = accumulator += blog.likes;
      return totalLikes;
    }, 0)
    //console.log("likesForAuthor", likesForAuthor)
    return {
      author: authorName,
      blogs: arrayForAuthor.length,
      likes: likesForAuthor
    };
  });
  return arrayWithAuthorBlogsLikes;
}

const mostBlogs = (blogs) => {

  const arrayWithAuthorAndBlogs = sortBlogsByAuthor(blogs).map((blog) => {
    return _.pick(blog, ["author", "blogs"])
  });
  // console.log('arrayWithAuthorAndBlogs', arrayWithAuthorAndBlogs );
  const sortedArrayWithAuthorandBlogTotal = _.orderBy(
    arrayWithAuthorAndBlogs,
    ['blogs'],
    ['desc']
  );
  // console.log('sortedArrayWithAuthorandBlogTotal', sortedArrayWithAuthorandBlogTotal);
  return sortedArrayWithAuthorandBlogTotal.length === 0 ? null : sortedArrayWithAuthorandBlogTotal[0];
};

const mostLikes = () => {
 
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
