const mongoose = require('mongoose');
mongoose.set('bufferTimeoutMS', 30000);
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log('test database cleared');
  await Blog.insertMany(helper.initialBlogs);
  console.log('test database initiation complete');
}, 100000);

//for exercise 4.8: Blog list tests, step1

test('correct number of blogs are returned as json', async () => {
  console.log('entered test');
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

// for exercise 4.9*: Blog list tests, step2

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

  //const response = await api.get('/api/blogs');

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(blogsAtEnd).toEqual(
    expect.arrayContaining([expect.objectContaining(newBlog)])
  );
});

test('a blog without title or author or url is not added', async () => {
  const newBlog = {
    likes: 4,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  //const response = await api.get('/api/blogs');
  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
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
