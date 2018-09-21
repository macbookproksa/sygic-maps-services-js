import { expect } from 'chai'
import { mapMatching, speedingReport } from '../src/api/analytics'
import services from '../src/index'

describe('analytics', () => {
  let sygicServices = null

  before(() => {
    sygicServices = services.create({
      key: process.env.API_KEY
    })
  })

  describe('mapMatching', () => {
    it('should return a valid query', function () {
      expect(
        mapMatching.validator({
          path: 'wsfxHzxsC??@FFv@EZu@~@???@aDzAKAm@HCPF^V^t@ZvFgE`KmLjEuH??NE^NNNzBz@VIjAmBiCcUcH_YuIsXaKeXyKwWgLcVoLmU',
          accuracies: [9, 9, 10, 10, 10, 11, 11, 11, 11, 10, 11, 11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 9, 11, 10, 11, 11, 11, 11, 11, 11, 11, 9],
          timestamps: [1464691627, 1464691698],
          units: 'metric'
        })
      ).to.deep.equal({
        path: 'wsfxHzxsC??@FFv@EZu@~@???@aDzAKAm@HCPF^V^t@ZvFgE`KmLjEuH??NE^NNNzBz@VIjAmBiCcUcH_YuIsXaKeXyKwWgLcVoLmU',
        accuracies: [9, 9, 10, 10, 10, 11, 11, 11, 11, 10, 11, 11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 9, 11, 10, 11, 11, 11, 11, 11, 11, 11, 9],
        timestamps: [1464691627, 1464691698],
        units: 'metric'
      })
    })

    it('should return a valid query', function () {
      expect(
        mapMatching.validator({
          coordinates: [
            { lat: '48.15544', lng: 17.10766 },
            { lat: 48.14306, lng: '-17.12216' },
            { lat: -48.1577, lng: 17.16626 }
          ],
          accuracies: [9, 9, 10, 10, 10, 11, 11, 11, 11, 10, 11, 11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 9, 11, 10, 11, 11, 11, 11, 11, 11, 11, 9],
          timestamps: [1464691627, 1464691698],
          units: 'metric'
        })
      ).to.deep.equal({
        coordinates: ['48.15544,17.10766', '48.14306,-17.12216', '-48.1577,17.16626'],
        accuracies: [9, 9, 10, 10, 10, 11, 11, 11, 11, 10, 11, 11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 9, 11, 10, 11, 11, 11, 11, 11, 11, 11, 9],
        timestamps: [1464691627, 1464691698],
        units: 'metric'
      })
    })

    it('should return an error if path and coordinates is defined', function () {
      expect(
        function () {
          return mapMatching.validator({
            path: 'wsfxHzxsC??@FFv@EZu@~@???@aDzAKAm@HCPF^V^t@ZvFgE`KmLjEuH??NE^NNNzBz@VIjAmBiCcUcH_YuIsXaKeXyKwWgLcVoLmU',
            coordinates: [
              { lat: '48.15544', lng: 17.10766 },
              { lat: 48.14306, lng: '-17.12216' },
              { lat: -48.1577, lng: 17.16626 }
            ]
          })
        }
      ).to.throw('Cannot specify properties "path" and "coordinates" together')
    })

    it('should return a valid respone', (done) => {
      sygicServices.mapMatching({
        path: 'wsfxHzxsC??@FFv@EZu@~@???@aDzAKAm@HCPF^V^t@ZvFgE`KmLjEuH??NE^NNNzBz@VIjAmBiCcUcH_YuIsXaKeXyKwWgLcVoLmU',
        accuracies: [9, 9, 10, 10, 10, 11, 11, 11, 11, 10, 11, 11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 9, 11, 10, 11, 11, 11, 11, 11, 11, 11, 9]
      }, (error, response) => {
        expect(error).to.be.null
        expect(response.status).to.equal(200)
        expect(response.data).to.be.not.empty
        done()
      })
    })
  })

  describe('speedingReport', () => {
    it('should return a valid query', function () {
      expect(
        speedingReport.validator({
          coordinates: [
            { lat: '51.321075', lng: -0.7619 },
            { lat: 51.321075, lng: '-0.7619' },
            { lat: 51.32107, lng: -0.761935 }
          ],
          accuracies: [9, 9, 10],
          speeds: [48, 48, 48],
          timestamps: [1464691627, 1464691698],
          units: 'metric'
        })
      ).to.deep.equal({
        coordinates: ['51.321075,-0.7619', '51.321075,-0.7619', '51.32107,-0.761935'],
        accuracies: [9, 9, 10],
        speeds: [48, 48, 48],
        timestamps: [1464691627, 1464691698],
        units: 'metric'
      })
    })

    it('should return a valid respone', (done) => {
      sygicServices.speedingReport({
        coordinates: [
          { lat: '51.321075', lng: -0.7619 },
          { lat: 51.321075, lng: '-0.7619' },
          { lat: 51.32107, lng: -0.761935 }
        ],
        accuracies: [9, 9, 10],
        speeds: [48, 48, 48],
        timestamps: [1464691627, 1464691698, 1464691699],
        units: 'metric'
      }, (error, response) => {
        expect(error).to.be.null
        expect(response.status).to.equal(200)
        expect(response.data).to.be.not.empty
        done()
      })
    })
  })
})
