import { expect } from 'chai';
import services from '../../src';

describe('geocoding', () => {

  let sygicServices = null;

  before(() => {
    sygicServices = services.create({
      key: process.env.API_KEY
    });
  });

  describe('geocode', () => {
    it('valid respone', (done) => {
      expect(() => {
        sygicServices.geocode({
          country: 'Deutschland',
          city: 'Berlin',
          street: 'Bernauer Strasse',
          house_number: '12',
          zip: '13355',
          admin_level_1: 'Berlin'
        }, (error, response) => {
          expect(error).to.be.null;
          expect(response.data).to.not.be.null;
          expect(response.status).to.equal(200);
          expect(response.data.results).to.be.not.empty;
          done();
        });
      }).to.not.throw();
    });
  });

  describe('reverseGeocode', () => {
    it('valid respone', (done) => {
      sygicServices.reverseGeocode({
        location: { lat: 48.204876, lng: 16.351456 }
      }, (error, response) => {
        expect(error).to.be.null;
        expect(response.data).to.not.be.null;
        expect(response.status).to.equal(200);
        expect(response.data.results).to.be.not.empty;
        done();
      });
    });
  });
});