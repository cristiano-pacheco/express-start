const mongoose = require('mongoose');

describe('Route index', () => {
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

  describe('GET /', () => {
    it('should return a json { ok: true }', () => {
      request.get('/').end((err, res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.body).to.eql({ ok: true });
      });
    });
  });
});
