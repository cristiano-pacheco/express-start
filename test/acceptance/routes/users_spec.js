const mongoose = require('mongoose');
const User = require('../../../src/models/user');

/* eslint-disable no-underscore-dangle */
describe('Route users', () => {
  let request;

  before((done) => {
    setupApp()
      .then((app) => {
        request = supertest(app);
        done();
      })
      .catch(err => done(err));
  });

  after(() => mongoose.disconnect());

  const defaultId = '56cb91bdc3464f14678934ca';

  const defaultUser = {
    id: defaultId,
    name: 'default user',
    email: 'email@gmail.com',
    password: '123456',
    status: true,
  };

  const expectedDepartment = {
    __v: 0,
    _id: defaultId,
    name: 'default user',
    email: 'email@gmail.com',
    status: true,
  };

  beforeEach(() => {
    const user = new User(defaultUser);
    user._id = defaultId;
    return User.remove({}).then(() => user.save());
  });

  afterEach(() => User.remove({}));

  describe('Route GET /users', () => {
    it('should return a list of users', (done) => {
      request.get('/users').end((err, res) => {
        expect(res.body.data).to.eql([expectedDepartment]);
        done(err);
      });
    });
  });

  describe('Route GET /users/:id', () => {
    it('should return a user', (done) => {
      request.get(`/users/${defaultId}`).end((err, res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.body).to.eql([expectedDepartment]);
        done(err);
      });
    });
  });

  describe('Route POST /users', () => {
    it('should create and return a new user with status 201', (done) => {
      const customId = '56cb91bdc3464f14678934ba';

      const newUser = {
        _id: customId,
        name: 'new user',
        email: 'new_email@gmail.com',
        password: 'new password',
        status: 0,
      };
      const expectedSavedUser = {
        __v: 0,
        _id: customId,
        name: 'new user',
        email: 'new_email@gmail.com',
        status: false,
      };

      request
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          expect(res.statusCode).to.eql(201);
          expect(res.body).to.eql(expectedSavedUser);
          done(err);
        });
    });
  });

  describe('Route PUT /users/:id', () => {
    it('should update a user', (done) => {
      const customUser = {
        _id: defaultId,
        name: 'updated user',
        email: 'updated@email.com',
        status: 0,
        password: '123456',
      };

      request
        .put(`/users/${defaultId}`)
        .send(customUser)
        .end((err, res) => {
          expect(res.status).to.eql(200);
          done(err);
        });
    });
  });

  describe('Route DELETE /users/:id', () => {
    it('should delete a user', (done) => {
      request.delete(`/users/${defaultId}`).end((err, res) => {
        expect(res.statusCode).to.eql(204);
        done(err);
      });
    });
  });
});
