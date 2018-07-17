import { expect } from 'chai';
import { optimization } from '../src/api/optimization';
import services from '../src/index';

describe('optimization', () => {

  let sygicServices = null;

  before(() => {
    sygicServices = services.create({
      key: process.env.API_KEY
    });
  });

  describe('optimization', () => {
    it('should return a valid query', function() {
      expect(
        optimization.validator({
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
              coordinates: { lat: '48.21287', lng: 17.17401 }
            },
            {
              location_id: 'customer01',
              coordinates: { lat: -48.14713, lng: '17.08430' },
              availability: [
                {
                  earliest_start: '2017-03-02T08:00:00',
                  latest_end: '2017-03-02T08:30:00'
                },
                {
                  earliest_start: '2017-03-02T08:00:00',
                  latest_end: '2017-03-02T08:30:00'
                }
              ]
            },
            {
              location_id: 'customer02',
              coordinates: { lat: 48.15349, lng: -17.08556 },
              availability: [
                {
                  earliest_start: '2017-03-02T08:00:00',
                  latest_end: '2017-03-02T18:00:00'
                }
              ]
            },
            {
              location_id: 'customer03',
              coordinates: { lat: '-48.14932', lng: 17.21944 },
              availability: [
                {
                  earliest_start: '2017-03-02T08:00:00',
                  latest_end: '2017-03-02T18:00:00'
                }
              ]
            },
            {
              location_id: 'customer04',
              coordinates: { lat: 48.16555, lng: 17.13828 },
              availability: [
                {
                  earliest_start: '2017-03-02T08:00:00',
                  latest_end: '2017-03-02T18:00:00'
                }
              ]
            },
            {
              location_id: 'customer05',
              coordinates: { lat: 48.15032, lng: 17.15797 },
              availability: [
                {
                  earliest_start: '2017-03-02T08:00:00',
                  latest_end: '2017-03-02T18:00:00'
                }
              ]
            }
          ],
          vehicles: [
            {
              vehicle_id: 'vehicle',
              profile: 'truck',
              cost_per_km: 1,
              cost_per_hour: 0,
              fixed_cost: 10,
              start_location_id: 'depot',
              end_location_id: 'depot',
              max_capacity: [100, 500],
              max_total_duration: '12:00:00',
              max_travel_distance: 9999,
              availability: [
                {
                  earliest_start: '2017-03-02T08:00:00',
                  latest_end: '2017-03-02T18:00:00'
                }
              ]
            }
          ],
          tasks: [
            {
              task_id: 'task01',
              priority: 'normal',
              activities: [
                {
                  activity_type: 'visit',
                  location_id: ['customer01'],
                  service_time: '00:05:00'
                }
              ]
            },
            {
              task_id: 'task02',
              capacity: [1, 50],
              compatible_vehicles: ['vehicle2', 'vehicle3'],
              activities: [
                {
                  activity_type: 'visit',
                  location_id: ['customer02']
                }
              ]
            },
            {
              task_id: 'task03',
              activities: [
                {
                  activity_type: 'visit',
                  location_id: ['customer03']
                }
              ]
            },
            {
              task_id: 'task04',
              activities: [
                {
                  activity_type: 'visit',
                  location_id: ['customer04']
                }
              ]
            },
            {
              task_id: 'task05',
              activities: [
                {
                  activity_type: 'visit',
                  location_id: ['customer05'],
                  service_time: '10:55:12',
                  availability: [
                    {
                      earliest_start: '2017-03-02T08:00:00',
                      latest_end: '2017-03-02T18:00:00'
                    }
                  ]
                }
              ]
            }
          ]
        })
      ).to.deep.equal({
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
            coordinates: '48.21287,17.17401'
          },
          {
            location_id: 'customer01',
            coordinates: '-48.14713,17.0843',
            availability: [
              {
                earliest_start: '2017-03-02T08:00:00',
                latest_end: '2017-03-02T08:30:00'
              },
              {
                earliest_start: '2017-03-02T08:00:00',
                latest_end: '2017-03-02T08:30:00'
              }
            ]
          },
          {
            location_id: 'customer02',
            coordinates: '48.15349,-17.08556',
            availability: [
              {
                earliest_start: '2017-03-02T08:00:00',
                latest_end: '2017-03-02T18:00:00'
              }
            ]
          },
          {
            location_id: 'customer03',
            coordinates: '-48.14932,17.21944',
            availability: [
              {
                earliest_start: '2017-03-02T08:00:00',
                latest_end: '2017-03-02T18:00:00'
              }
            ]
          },
          {
            location_id: 'customer04',
            coordinates: '48.16555,17.13828',
            availability: [
              {
                earliest_start: '2017-03-02T08:00:00',
                latest_end: '2017-03-02T18:00:00'
              }
            ]
          },
          {
            location_id: 'customer05',
            coordinates: '48.15032,17.15797',
            availability: [
              {
                earliest_start: '2017-03-02T08:00:00',
                latest_end: '2017-03-02T18:00:00'
              }
            ]
          }
        ],
        vehicles: [
          {
            vehicle_id: 'vehicle',
            profile: 'truck',
            cost_per_km: 1,
            cost_per_hour: 0,
            fixed_cost: 10,
            start_location_id: 'depot',
            end_location_id: 'depot',
            max_capacity: [100, 500],
            max_total_duration: '12:00:00',
            max_travel_distance: 9999,
            availability: [
              {
                earliest_start: '2017-03-02T08:00:00',
                latest_end: '2017-03-02T18:00:00'
              }
            ]
          }
        ],
        tasks: [
          {
            task_id: 'task01',
            priority: 'normal',
            activities: [
              {
                activity_type: 'visit',
                location_id: ['customer01'],
                service_time: '00:05:00'
              }
            ]
          },
          {
            task_id: 'task02',
            capacity: [1, 50],
            compatible_vehicles: ['vehicle2', 'vehicle3'],
            activities: [
              {
                activity_type: 'visit',
                location_id: ['customer02']
              }
            ]
          },
          {
            task_id: 'task03',
            activities: [
              {
                activity_type: 'visit',
                location_id: ['customer03']
              }
            ]
          },
          {
            task_id: 'task04',
            activities: [
              {
                activity_type: 'visit',
                location_id: ['customer04']
              }
            ]
          },
          {
            task_id: 'task05',
            activities: [
              {
                activity_type: 'visit',
                location_id: ['customer05'],
                service_time: '10:55:12',
                availability: [
                  {
                    earliest_start: '2017-03-02T08:00:00',
                    latest_end: '2017-03-02T18:00:00'
                  }
                ]
              }
            ]
          }
        ]
      });
    });

    it('should return a valid respone', (done) => {
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
              availability: [
                {
                  earliest_start: '2017-03-02T08:00:00',
                  latest_end: '2017-03-02T08:30:00'
                }
              ]
            },
            {
              location_id: 'customer02',
              coordinates: { lat: 48.15349, lng: 17.08556 },
              availability: [
                {
                  earliest_start: '2017-03-02T08:00:00',
                  latest_end: '2017-03-02T18:00:00'
                }
              ]
            },
            {
              location_id: 'customer03',
              coordinates: { lat: 48.14932, lng: 17.21944 },
              availability: [
                {
                  earliest_start: '2017-03-02T08:00:00',
                  latest_end: '2017-03-02T18:00:00'
                }
              ]
            },
            {
              location_id: 'customer04',
              coordinates: { lat: 48.16555, lng: 17.13828 },
              availability: [
                {
                  earliest_start: '2017-03-02T08:00:00',
                  latest_end: '2017-03-02T18:00:00'
                }
              ]
            },
            {
              location_id: 'customer05',
              coordinates: { lat: 48.15032, lng: 17.15797 },
              availability: [
                {
                  earliest_start: '2017-03-02T08:00:00',
                  latest_end: '2017-03-02T18:00:00'
                }
              ]
            }
          ],
          vehicles: [
            {
              vehicle_id: 'vehicle',
              profile: 'truck',
              cost_per_km: 1,
              cost_per_hour: 0,
              fixed_cost: 10,
              start_location_id: 'depot',
              end_location_id: 'depot',
              //max_capacity: [100, 500],
              max_total_duration: '12:00:00',
              max_travel_distance: 9999,
              availability: [
                {
                  earliest_start: '2017-03-02T08:00:00',
                  latest_end: '2017-03-02T18:00:00'
                }
              ]
            }
          ],
          tasks: [
            {
              task_id: 'task01',
              priority: 'normal',
              activities: [
                {
                  activity_type: 'visit',
                  location_id: ['customer01'],
                  service_time: '00:05:00'
                }
              ]
            },
            {
              task_id: 'task02',
              activities: [
                {
                  activity_type: 'visit',
                  location_id: ['customer02']
                }
              ]
            },
            {
              task_id: 'task03',
              activities: [
                {
                  activity_type: 'visit',
                  location_id: ['customer03']
                }
              ]
            },
            {
              task_id: 'task04',
              activities: [
                {
                  activity_type: 'visit',
                  location_id: ['customer04']
                }
              ]
            },
            {
              task_id: 'task05',
              activities: [
                {
                  activity_type: 'visit',
                  location_id: ['customer05'],
                  availability: [
                    {
                      earliest_start: '2017-03-02T08:00:00',
                      latest_end: '2017-03-02T18:00:00'
                    }
                  ]
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