const HomeController = require('../../../src/controllers/home');
const sinon = require('sinon');

describe('Controllers: Home', () => {
  describe('index()', () => {
    it('should call json with { ok: true }', () => {
      const request = {};
      const response = {
        json: sinon.spy(),
      };
      const homeController = new HomeController();
      homeController.index(request, response);
      sinon.assert.calledWith(response.json, { ok: true });
    });
  });
});
