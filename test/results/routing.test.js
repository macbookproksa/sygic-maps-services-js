import { expect } from 'chai';
import services from '../../src';

describe('routing', () => {

  let sygicServices = null;

  before(() => {
    sygicServices = services.create({
      key: process.env.API_KEY
    });
  });

  describe('directions', () => {
    it('valid respone', (done) => {
      expect(() => {
        sygicServices.directions({
          origin: { lat: 48.13103840803432, lng: 17.113952636718754 },
          destination: { lat: 48.38544219115486, lng: 17.575378417968754 },
          speed_profiles: true,
          traffic: false,
          waypoints: [
            { lat: '48.28468', lng: 17.27055, isVia: false, stopTime: 0 }
          ],
          avoid: ['unpaved', 'ferries'],
          avoid_rectangles: [
            [
              { lat: 48.24936904607431, lng: 17.259521484375004 },
              { lat: 48.24936904607431, lng: 17.42294311523438 },
              { lat: 48.164711477297736, lng: 17.42294311523438 },
              { lat: 48.164711477297736, lng: '17.259521484375004' }
            ]
          ],
          avoid_countries: ['AUT'],
          vehicle_heading: 90,
          vehicle_type: 'car',
          route_computing: 'fastest',
          compute_alternatives: true,
          units: 'metric',
          max_speed: 200,
          departure_time: 1519113230,
          prefer_right_turn: false,
          dest_in_driving_side: false,
          total_weight: 1200,
          axle_weight: 1000,
          total_length: 5000,
          width: 3000,
          height: 2000,
          trailers: 1,
          vehicle_axles: 0,
          general_hazard: false,
          water_hazard: false,
          tunnel: 'b',
          steps: false,
          lang: 'svk'
        }, (error, response) => {
          expect(error).to.be.null;
          expect(response.data).to.not.be.null;
          expect(response.status).to.equal(200);
          expect(response.data.routes).to.be.not.empty;
          done();
        });
      }).to.not.throw();
    });
  });

  describe('matching', () => {
    it('valid respone', (done) => {
      sygicServices.matching({
        path: 'gjn~FrhdvOz~AvIbjBlc@v{BzcBdbCzqHrhAl{B'
      }, (error, response) => {
        expect(error).to.be.null;
        expect(response.status).to.equal(200);
        expect(response.data).to.be.not.empty;
        done();
      });
    });
  });

  describe('roadinfo', () => {
    it('valid respone', (done) => {
      sygicServices.roadInfo({
        lat: '48.15021',
        lng: 17.12543,
        time: 0,
        vehicle_heading: 99
      }, (error, response) => {
        expect(error).to.be.null;
        expect(response.status).to.equal(200);
        expect(response.data).to.be.not.empty;
        done();
      });
    });
  });

  describe('distanceMatrix', () => {
    it('valid respone', (done) => {
      sygicServices.distanceMatrix({
        origins: [
          { lat: 48.15544, lng: 17.10766 },
          { lat: 48.14306, lng: 17.12216 },
          { lat: 48.1577, lng: 17.16626 }
        ],
        destinations: [
          { lat: 48.16921, lng: 17.13893 },
          { lat: 48.18242, lng: 17.05485 },
          { lat: 48.12532, lng: 17.097 }
        ]
      }, (error, response) => {
        expect(error).to.be.null;
        expect(response.status).to.equal(200);
        expect(response.data).to.be.not.empty;
        done();
      });
    });
  });

  describe('sendToNavi', () => {
    it('valid respone', (done) => {
      sygicServices.sendToNavi({
        message: 'Test',
        name: 'Test name',
        tags: 'id_test',
        directions_api_parameters: {
          origin: { lat: 48.13103840803432, lng: 17.113952636718754 },
          destination: { lat: 48.38544219115486, lng: 17.575378417968754 },
          speed_profiles: true,
          traffic: false,
          waypoints: [
            { lat: '48.28468', lng: 17.27055, isVia: false, stopTime: 0 }
          ],
          avoid: ['unpaved', 'ferries'],
          avoid_rectangles: [
            [
              { lat: 48.24936904607431, lng: 17.259521484375004 },
              { lat: 48.24936904607431, lng: 17.42294311523438 },
              { lat: 48.164711477297736, lng: 17.42294311523438 },
              { lat: 48.164711477297736, lng: '17.259521484375004' }
            ]
          ],
          avoid_countries: ['AUT'],
          vehicle_heading: 90,
          vehicle_type: 'car',
          route_computing: 'fastest',
          compute_alternatives: true,
          units: 'metric',
          max_speed: 200,
          departure_time: 1519113230,
          prefer_right_turn: false,
          dest_in_driving_side: false,
          total_weight: 1200,
          axle_weight: 1000,
          total_length: 5000,
          width: 3000,
          height: 2000,
          trailers: 1,
          vehicle_axles: 0,
          general_hazard: false,
          water_hazard: false,
          tunnel: 'b',
          steps: false,
          lang: 'svk'
        }
      }, (error, response) => {
        expect(error).to.be.null;
        expect(response.status).to.equal(200);
        done();
      });
    });
  });

});