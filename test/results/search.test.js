import { expect } from 'chai';
import services from '../../src';

describe('search', () => {
  let sygicServices = null;

  before(() => {
    sygicServices = services.create({
      key: process.env.API_KEY
    });
  });

  describe('autocomplete', () => {
    it('valid respone', (done) => {
      sygicServices.autocomplete({
        query: 'veveri',
        lat: '48.204876',
        lng: 16.351456,
        includeDetails: true
      }, (error, response) => {
        expect(error).to.be.null;
        expect(response.status).to.equal(200);
        expect(response.data).to.be.not.empty;
        done();
      });
    });
  });

  describe('autocompleteDetail', () => {
    it('valid respone', (done) => {
      sygicServices.autocompleteDetails({
        resultId: 'CAIQARjj9JUDIPZ0KJcFUgZWRVZFUklgt4GvtwI='
      }, (error, response) => {
        expect(error).to.be.null;
        expect(response.status).to.equal(200);
        expect(response.data).to.be.not.empty;
        done();
      });
    });
  });
});