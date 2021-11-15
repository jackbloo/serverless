'use strict';

// tests for getMembers
const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('getMembers', '/handler.js', 'getMembers');

describe('getMembers', () => {
  before((done) => {
    done();
  });
  it('Should return 200', async () => {
    const response = await wrapped.run({pathParameters:{orgName:"testCompany"}});
    expect(response).to.not.be.empty;
    expect(response.statusCode).to.be(200)
    expect(response.body).length.to.be(0)
  });
});
