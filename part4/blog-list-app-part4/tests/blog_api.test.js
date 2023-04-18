const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[2]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[3]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[4]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[5]);
  await blogObject.save();
});

//for exercise 4.8: Blog list tests, step1

/* Use the supertest package for writing a test that makes an HTTP GET
request to the /api/blogs url. Verify that the blog list application
returns the correct amount of blog posts in the JSON format.

Once the test is finished, refactor the route handler to use the 
async/await syntax instead of promises.

Notice that you will have to make similar changes to the code 
that were made in the material, like defining the test environment so 
that you can write tests that use their own separate database. */

test('correct number of blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(6)

  console.log('response', response);
}, 100000);

// test('a valid note can be added', async () => {
//   const newBlog = {
//     title: 'async/await simplifies making async calls',
//     author: 'test author',
//     url: 'test url',
//     likes: 7,
//   }

//   await api
//     .post('/api/notes')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const response = await api.get('/api/blogs')

//   const contents = response.body.map(r => r.content)

//   expect(response.body).toHaveLength(initialNotes.length + 1)
//   expect(contents).toContain(
//     'async/await simplifies making async calls'
//   )
// })

// test('there are two notes', async () => {
//   const response = await api.get('/api/notes')

//   expect(response.body).toHaveLength(2)
// })

// test('the first note is about HTTP methods', async () => {
//   const response = await api.get('/api/notes')

//   expect(response.body[0].content).toBe('HTML is easy')
// })

afterAll(() => {
  mongoose.connection.close();
});
