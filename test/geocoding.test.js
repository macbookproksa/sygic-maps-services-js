import { expect } from 'chai'
import { geocode, reverseGeocode } from '../src/api/geocoding'
import services from '../src/index'

describe('geocoding', () => {

  let sygicServices = null

  before(() => {
    sygicServices = services.create({
      key: process.env.API_KEY
    })
  })

  describe('geocode', () => {
    it('should return a valid query', function () {
      expect(
        geocode.validator({
          country: 'Country',
          city: 'City',
          suburb: 'Suburb',
          street: 'Street',
          house_number: '12',
          zip: '12345',
          admin_level_1: 'admin_level_1'
        })
      ).to.deep.equal({
        country: 'Country',
        city: 'City',
        suburb: 'Suburb',
        street: 'Street',
        house_number: '12',
        zip: '12345',
        admin_level_1: 'admin_level_1'
      })
    })

    it('should return an error if location and other is defined', function () {
      expect(
        function () {
          return geocode.validator({
            location: 'Location',
            country: 'Country'
          })
        }
      ).to.throw('Cannot specify properties "location" and "country" together')

      expect(
        function () {
          return geocode.validator({
            location: 'Location',
            city: 'City'
          })
        }
      ).to.throw('Cannot specify properties "location" and "city" together')

      expect(
        function () {
          return geocode.validator({
            location: 'Location',
            street: 'Street'
          })
        }
      ).to.throw('Cannot specify properties "location" and "street" together')

      expect(
        function () {
          return geocode.validator({
            location: 'Location',
            house_number: 'House_number'
          })
        }
      ).to.throw('Cannot specify properties "location" and "house_number" together')
    })

    it('should return a valid respone', (done) => {
      expect(() => {
        sygicServices.geocode({
          country: 'Deutschland',
          city: 'Berlin',
          street: 'Bernauer Strasse',
          house_number: '12',
          zip: '13355',
          admin_level_1: 'Berlin'
        }, (error, response) => {
          expect(error).to.be.null
          expect(response.data).to.not.be.null
          expect(response.status).to.equal(200)
          expect(response.data.results).to.be.not.empty
          done()
        })
      }).to.not.throw()
    })
  })

  describe('reverseGeocode', () => {
    it('should return a valid query', function () {
      expect(
        reverseGeocode.validator({
          location: { lat: '-48.204876', lng: 16.351456 }
        })
      ).to.deep.equal({
        location: '-48.204876,16.351456'
      })
    })

    it('should return an error if coordinates are invalid', function () {
      expect(
        function () {
          return reverseGeocode.validator({
            location: { lat: '-48.204876', lng: 916.351456 }
          })
        }
      ).to.throw('In property "lng": Error: Invalid longitude. Valid range of latitude in degrees is -180 and +180.')

      expect(
        function () {
          return reverseGeocode.validator({
            location: { lat: '-248.204876', lng: 16.351456 }
          })
        }
      ).to.throw('In property "lat": Error: Invalid latitude. Valid range of latitude in degrees is -90 and +90.')
    })

    it('should return a valid respone', (done) => {
      sygicServices.reverseGeocode({
        location: { lat: 48.204876, lng: 16.351456 }
      }, (error, response) => {
        expect(error).to.be.null
        expect(response.data).to.not.be.null
        expect(response.status).to.equal(200)
        expect(response.data.results).to.be.not.empty
        done()
      })
    })
  })
})