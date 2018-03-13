import { expect } from 'chai';
import services from '../../src';

describe('optimization', () => {

  let sygicServices = null;

  before(() => {
    sygicServices = services.create({
      key: process.env.API_KEY
    });
  });

  describe('optimization', () => {
    it('valid respone', (done) => {
      expect(() => {
        sygicServices.optimization({
          settings: {
            max_wait_time: '12:00:00',
            routing_mode: 'fastest',
            max_tour_count: 1,
            distance_matrix_id: 'test',
            optimization_level: 'normal'
          },
          locations: [
            {
              location_id: 'depot',
              coordinates: { lat: 48.21287, lng: 17.17401 }
            },
            {
              location_id: 'customer01',
              coordinates: { lat: 48.14713, lng: 17.08430 },
              availability: {
                earliest_start: '2017-03-02T08:00:00',
                latest_end: '2017-03-02T08:30:00'
              }
            },
            {
              location_id: 'customer02',
              coordinates: { lat: 48.15349, lng: 17.08556 },
              availability: {
                earliest_start: '2017-03-02T08:00:00',
                latest_end: '2017-03-02T18:00:00'
              }
            },
            {
              location_id: 'customer03',
              coordinates: { lat: 48.14932, lng: 17.21944 },
              availability: {
                earliest_start: '2017-03-02T08:00:00',
                latest_end: '2017-03-02T18:00:00'
              }
            },
            {
              location_id: 'customer04',
              coordinates: { lat: 48.16555, lng: 17.13828 },
              availability: {
                earliest_start: '2017-03-02T08:00:00',
                latest_end: '2017-03-02T18:00:00'
              }
            },
            {
              location_id: 'customer05',
              coordinates: { lat: 48.15032, lng: 17.15797 },
              availability: {
                earliest_start: '2017-03-02T08:00:00',
                latest_end: '2017-03-02T18:00:00'
              }
            }
          ],
          vehicles: [
            {
              vehicle_id: 'vehicle',
              cost_per_km: 1,
              cost_per_hour: 0,
              fixed_cost: 10,
              start_location_id: 'depot',
              end_location_id: 'depot',
              //max_capacity: [100, 500],
              availability: {
                earliest_start: '2017-03-02T08:00:00',
                latest_end: '2017-03-02T18:00:00'
              }
            }
          ],
          tasks: [
            {
              task_id: 'task01',
              priority: 'normal',
              activities: [
                {
                  activity_type: 'visit',
                  location_id: 'customer01',
                  service_time: '00:05:00'
                }
              ]
            },
            {
              task_id: 'task02',
              activities: [
                {
                  activity_type: 'visit',
                  location_id: 'customer02'
                }
              ]
            },
            {
              task_id: 'task03',
              activities: [
                {
                  activity_type: 'visit',
                  location_id: 'customer03'
                }
              ]
            },
            {
              task_id: 'task04',
              activities: [
                {
                  activity_type: 'visit',
                  location_id: 'customer04'
                }
              ]
            },
            {
              task_id: 'task05',
              activities: [
                {
                  activity_type: 'visit',
                  location_id: 'customer05'
                }
              ]
            }
          ]
        }, (error, response) => {
          expect(error).to.be.null;
          expect(response.data).to.not.be.null;
          expect(response.status).to.equal(202);
          done();
        });
      }).to.not.throw();
    });
  });
});