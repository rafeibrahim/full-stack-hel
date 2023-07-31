const mongoose = require('mongoose');
mongoose.set('bufferTimeoutMS', 30000);
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
}, 100000);

describe('when there is initially some notes saved', () => {
  let blogs;

  beforeEach(async () => {
    // Fetch the blogs once and store them in the 'blogs' variable for reuse
    if (!blogs) {
      console.log('beforeEach in describe block');
      const response = await api.get('/api/blogs');
      blogs = response.body;
    }
  });

  test('blogs are returned as json', () => {
    return api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', () => {
    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });
});


test('unique identifier property of the blog posts is named id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);

  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 7,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(blogsAtEnd).toEqual(
    expect.arrayContaining([expect.objectContaining(newBlog)])
  );
});

test('a blog without title and url is not added', async () => {
  const newBlogWithoutBothTitleAndUrl = {
    author: 'test author',
    likes: 4,
  };
  await api.post('/api/blogs').send(newBlogWithoutBothTitleAndUrl).expect(400);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('a blog without title is not added', async () => {
  const newBlogWithoutTitle = {
    author: 'test author',
    url: 'test url',
    likes: 4,
  };
  await api.post('/api/blogs').send(newBlogWithoutTitle).expect(400);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('a blog without url is not added', async () => {
  const newBlogWithoutUrl = {
    title: 'test url',
    author: 'test author',
    likes: 4,
  };
  await api.post('/api/blogs').send(newBlogWithoutUrl).expect(400);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('a blog added without likes property default to the value 0 in db', async () => {
  const newBlogWithoutLikesProperty = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
  };

  await api
    .post('/api/blogs')
    .send(newBlogWithoutLikesProperty)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(blogsAtEnd).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ ...newBlogWithoutLikesProperty, likes: 0 }),
    ])
  );
});

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(resultBlog.body).toEqual(blogToView);
});

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  expect(blogsAtEnd).toEqual(
    expect.arrayContaining([expect.not.objectContaining(blogToDelete)])
  );
});

afterAll(() => {
  mongoose.connection.close();
});
