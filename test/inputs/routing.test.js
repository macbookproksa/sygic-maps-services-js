import { directions, matching, roadInfo, distanceMatrix, sendToNavi } from '../../src/api/routing';
import { expect } from 'chai';

describe('routing', function() {

  describe('directions', function() {
    it('should return a valid query', function() {
      expect(
        directions.validator({
          origin: { lat: '48.11028597523363', lng: -17.12724566459656 },
          destination: { lat: 48.28490634600474, lng: '17.73373603820801' },
          speed_profiles: true,
          traffic: false,
          waypoints: [
            { lat: '48.21094727794912', lng: '17.25565910339356' },
            { lat: -48.21462203499331, lng: 17.38444805145264, isVia: false },
            { lat: 48.2050556774789, lng: 17.418479919433597, stopTime: 600 },
            { lat: 48.202123924724624, lng: 17.528600692749027, isVia: true, stopTime: 0 },
            { lat: 48.241824189703564, lng: -17.697687149047855, isVia: false, stopTime: 600 }
          ],
          avoid: ['unpaved', 'ferries'],
          avoid_rectangles: [
            [
              { lat: '48.148564905217164', lng: 17.156181335449222 },
              { lat: -48.12702823764068, lng: 17.156181335449222 }
            ],
            [
              { lat: -48.16116195751926, lng: 17.165279388427738 },
              { lat: 48.16116195751926, lng: 17.19995498657227 },
              { lat: '48.15028286718964', lng: 17.19995498657227 },
              { lat: 48.15028286718964, lng: -17.165279388427738 }]
          ],
          avoid_countries: ['ger', 'hun'],
          vehicle_heading: 90,
          vehicle_type: 'car',
          route_computing: 'fastest',
          compute_alternatives: false,
          units: 'metric',
          max_speed: 130,
          departure_time: 1000,
          prefer_right_turn: false,
          dest_in_driving_side: false,
          total_weight: 12000,
          axle_weight: 1000,
          total_length: 12,
          width: 10,
          height: 4,
          trailers: 6,
          vehicle_axles: 6,
          general_hazard: false,
          water_hazard: false,
          tunnel: 'b',
          steps: true,
          lang: 'usa'
        })
      ).to.deep.equal({
        origin: '48.11028597523363,-17.12724566459656',
        destination: '48.28490634600474,17.73373603820801',
        speed_profiles: true,
        traffic: false,
        waypoints: '48.21094727794912,17.25565910339356,0|-48.21462203499331,17.38444805145264,0|48.2050556774789,17.418479919433597,600|via:48.202123924724624,17.528600692749027,0|48.241824189703564,-17.697687149047855,600',
        avoid: 'unpaved|ferries',
        avoid_rectangles: '48.148564905217164,17.156181335449222|-48.12702823764068,17.156181335449222;-48.16116195751926,17.165279388427738|48.16116195751926,17.19995498657227|48.15028286718964,17.19995498657227|48.15028286718964,-17.165279388427738',
        avoid_countries: 'ger|hun',
        vehicle_heading: 90,
        vehicle_type: 'car',
        route_computing: 'fastest',
        compute_alternatives: false,
        units: 'metric',
        max_speed: 130,
        departure_time: 1000,
        prefer_right_turn: false,
        dest_in_driving_side: false,
        total_weight: 12000,
        axle_weight: 1000,
        total_length: 12,
        width: 10,
        height: 4,
        trailers: 6,
        vehicle_axles: 6,
        general_hazard: false,
        water_hazard: false,
        tunnel: 'b',
        steps: true,
        lang: 'usa'
      });
    });
  });

  describe('matching', function() {
    it('should return a valid query', function() {
      expect(
        matching.validator({
          path: 'gjn~FrhdvOz~AvIbjBlc@v{BzcBdbCzqHrhAl{B',
          waypoint_indexes: 'index'
        })
      ).to.deep.equal({
        path: 'gjn~FrhdvOz~AvIbjBlc@v{BzcBdbCzqHrhAl{B',
        waypoint_indexes: 'index'
      });
    });
  });

  describe('roadInfo', function() {
    it('should return a valid query', function() {
      expect(
        roadInfo.validator({
          lat: '-48.15021',
          lng: 17.12543,
          time: 1000,
          vehicle_heading: 100
        })
      ).to.deep.equal({
        lat: -48.15021,
        lng: 17.12543,
        time: 1000,
        vehicle_heading: 100
      });
    });
  });

  describe('distanceMatrix', function() {
    it('should return a valid query', function() {
      expect(
        distanceMatrix.validator({
          origins: [
            { lat: '48.15544', lng: 17.10766 },
            { lat: 48.14306, lng: '-17.12216' },
            { lat: -48.1577, lng: 17.16626 }
          ],
          destinations: [
            { lat: 48.16921, lng: '-17.13893' },
            { lat: -48.18242, lng: 17.05485 },
            { lat: '48.12532', lng: 17.097 }
          ],
          route_computing: 'fastest',
          units: 'metric',
          vehicle_type: 'car',
          max_speed: 100
        })
      ).to.deep.equal({
        origins: ['48.15544,17.10766', '48.14306,-17.12216', '-48.1577,17.16626'],
        destinations: ['48.16921,-17.13893', '-48.18242,17.05485', '48.12532,17.097'],
        route_computing: 'fastest',
        units: 'metric',
        vehicle_type: 'car',
        max_speed: 100
      });
    });
  });

  describe('sendToNavi', function() {
    it('should return a valid query', function() {
      expect(
        sendToNavi.validator({
          message: 'Message',
          name: 'Name',
          tags: 'Tags',
          directions_api_parameters: {
            origin: { lat: '48.11028597523363', lng: -17.12724566459656 },
            destination: { lat: 48.28490634600474, lng: '17.73373603820801' },
            speed_profiles: true,
            traffic: false,
            waypoints: [
              { lat: '48.21094727794912', lng: '17.25565910339356' },
              { lat: -48.21462203499331, lng: 17.38444805145264, isVia: false },
              { lat: 48.2050556774789, lng: 17.418479919433597, stopTime: 600 },
              { lat: 48.202123924724624, lng: 17.528600692749027, isVia: true, stopTime: 0 },
              { lat: 48.241824189703564, lng: -17.697687149047855, isVia: false, stopTime: 600 }
            ],
            avoid: ['unpaved', 'ferries'],
            avoid_rectangles: [
              [
                { lat: '48.148564905217164', lng: 17.156181335449222 },
                { lat: -48.12702823764068, lng: 17.156181335449222 }
              ],
              [
                { lat: -48.16116195751926, lng: 17.165279388427738 },
                { lat: 48.16116195751926, lng: 17.19995498657227 },
                { lat: '48.15028286718964', lng: 17.19995498657227 },
                { lat: 48.15028286718964, lng: -17.165279388427738 }]
            ],
            avoid_countries: ['ger', 'hun'],
            vehicle_heading: 90,
            vehicle_type: 'car',
            route_computing: 'fastest',
            compute_alternatives: false,
            units: 'metric',
            max_speed: 130,
            departure_time: 1000,
            prefer_right_turn: false,
            dest_in_driving_side: false,
            total_weight: 12000,
            axle_weight: 1000,
            total_length: 12,
            width: 10,
            height: 4,
            trailers: 6,
            vehicle_axles: 6,
            general_hazard: false,
            water_hazard: false,
            tunnel: 'b',
            steps: true,
            lang: 'usa'
          }
        })
      ).to.deep.equal({
        message: 'Message',
        name: 'Name',
        tags: 'Tags',
        directions_api_parameters: {
          origin: '48.11028597523363,-17.12724566459656',
          destination: '48.28490634600474,17.73373603820801',
          speed_profiles: true,
          traffic: false,
          waypoints: '48.21094727794912,17.25565910339356,0|-48.21462203499331,17.38444805145264,0|48.2050556774789,17.418479919433597,600|via:48.202123924724624,17.528600692749027,0|48.241824189703564,-17.697687149047855,600',
          avoid: 'unpaved|ferries',
          avoid_rectangles: '48.148564905217164,17.156181335449222|-48.12702823764068,17.156181335449222;-48.16116195751926,17.165279388427738|48.16116195751926,17.19995498657227|48.15028286718964,17.19995498657227|48.15028286718964,-17.165279388427738',
          avoid_countries: 'ger|hun',
          vehicle_heading: 90,
          vehicle_type: 'car',
          route_computing: 'fastest',
          compute_alternatives: false,
          units: 'metric',
          max_speed: 130,
          departure_time: 1000,
          prefer_right_turn: false,
          dest_in_driving_side: false,
          total_weight: 12000,
          axle_weight: 1000,
          total_length: 12,
          width: 10,
          height: 4,
          trailers: 6,
          vehicle_axles: 6,
          general_hazard: false,
          water_hazard: false,
          tunnel: 'b',
          steps: true,
          lang: 'usa'
        }
      });
    });
  });
});