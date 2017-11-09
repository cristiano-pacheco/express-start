const mongoose = require('mongoose');
const Department = require('../../../src/models/department');

/* eslint-disable no-underscore-dangle */
describe('Route departments', () => {
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

  const defaultDepartment = {
    id: defaultId,
    name: 'default department',
  };

  const expectedDepartment = {
    __v: 0,
    _id: defaultId,
    name: 'default department',
  };

  beforeEach(() => {
    const department = new Department(defaultDepartment);
    department._id = defaultId;
    return Department.remove({}).then(() => department.save());
  });

  afterEach(() => Department.remove({}));

  describe('Route GET /departments', () => {
    it('should return a list of departments', (done) => {
      request.get('/departments').end((err, res) => {
        expect(res.body.data).to.eql([expectedDepartment]);
        done(err);
      });
    });
  });

  describe('Route GET /departments/:id', () => {
    it('should return a department', (done) => {
      request.get(`/departments/${defaultId}`).end((err, res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.body).to.eql([expectedDepartment]);
        done(err);
      });
    });
  });

  describe('Route POST /departments', () => {
    it('should create and return a new department with status 201', (done) => {
      const customId = '56cb91bdc3464f14678934ba';
      const newDepartment = Object.assign({}, { _id: customId, __v: 0 }, defaultDepartment);
      const expectedSavedDepartment = {
        __v: 0,
        _id: customId,
        name: 'default department',
      };

      request
        .post('/departments')
        .send(newDepartment)
        .end((err, res) => {
          expect(res.statusCode).to.eql(201);
          expect(res.body).to.eql(expectedSavedDepartment);
          done(err);
        });
    });
  });

  describe('Route PUT /departments/:id', () => {
    it('should update a department', (done) => {
      const customDepartment = {
        name: 'custom department',
      };
      const updatedDepartment = Object.assign({}, customDepartment, defaultDepartment);

      request
        .put(`/departments/${defaultId}`)
        .send(updatedDepartment)
        .end((err, res) => {
          expect(res.status).to.eql(200);
          done(err);
        });
    });
  });

  describe('Route DELETE /departments/:id', () => {
    it('should delete a department', (done) => {
      request.delete(`/departments/${defaultId}`).end((err, res) => {
        expect(res.statusCode).to.eql(204);
        done(err);
      });
    });
  });
});
