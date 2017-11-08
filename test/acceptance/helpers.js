const supertest = require('supertest');
const chai = require('chai');
const app = require('../../src/app.js');

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
