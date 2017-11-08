describe('Route index', () => {
  before(() =>
    setupApp().then((app) => {
      global.request = supertest(app);
    }));

  describe('GET /', () => {
    it('should return a json { ok: true }', () => {
      request.get('/').end((err, res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.body).to.eql({ ok: true });
      });
    });
  });
});
