import { expect } from 'chai';
import { autocomplete, autocompleteDetails } from '../src/api/search';
import services from '../src/index';

describe('search', () => {
  let resultId = '';
  let sygicServices = null;

  before(() => {
    sygicServices = services.create({
      key: process.env.API_KEY
    });
  });

  describe('autocomplete', () => {
    it('should return a valid query', function() {
      expect(
        autocomplete.validator({
          query: 'Text',
          lat: '-48.15021',
          lng: 17.12543,
          boundaryLeft: 16.351456,
          boundaryRight: '17.351456',
          boundaryTop: 47.204876,
          boundaryBottom: '48.204876',
          id: 'uid',
          typeFilter: 'poi',
          regionFilter: 'europe',
          countryFilter: 'deu',
          lang: 'EN-us'
        })
      ).to.deep.equal({
        query: 'Text',
        lat: -48.15021,
        lng: 17.12543,
        boundaryLeft: 16.351456,
        boundaryRight: 17.351456,
        boundaryTop: 47.204876,
        boundaryBottom: 48.204876,
        id: 'uid',
        typeFilter: 'poi',
        regionFilter: 'europe',
        countryFilter: 'deu',
        lang: 'EN-us'
      });
    });

    it('should return a valid respone', (done) => {
      sygicServices.autocomplete({
        query: 'veveri',
        lat: '48.204876',
        lng: 16.351456,
        boundaryLeft: 16.351456,
        boundaryRight: '17.351456',
        boundaryTop: 47.204876,
        boundaryBottom: '48.204876'
      }, (error, response) => {
        expect(error).to.be.null;
        expect(response.status).to.equal(200);
        expect(response.data).to.be.not.empty;
        resultId = response.data[0].id;
        done();
      });
    });
  });

  describe('autocompleteDetail', () => {
    it('should return a valid query', function() {
      expect(
        autocompleteDetails.validator({
          resultId: 'resultId'
        })
      ).to.deep.equal({
        resultId: 'resultId'
      });
    });

    it('should return a valid respone', (done) => {
      sygicServices.autocompleteDetails({
        resultId: resultId
      }, (error, response) => {
        expect(error).to.be.null;
        expect(response.status).to.equal(200);
        expect(response.data).to.be.not.empty;
        done();
      });
    });
  });
});
