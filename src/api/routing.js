import * as validate from '../util/validate';

exports.directions = {
  url: 'https://routing.api.sygic.com/v0/api/directions',
  options: {
    method: 'POST'
  },
  validator: validate.object({
    origin: validate.coordinates(
      validate.object({
        lat: validate.latitude,
        lng: validate.longitude
      })
    ),
    destination: validate.coordinates(
      validate.object({
        lat: validate.latitude,
        lng: validate.longitude
      })
    ),
    toll_costs: validate.optional(validate.bool),
    waypoints: validate.optional(
      validate.pipedArrayOf(
        validate.waypoints(
          validate.object({
            lat: validate.latitude,
            lng: validate.longitude,
            isVia: validate.optional(validate.bool),
            stopTime: validate.optional(validate.positiveNumber)
          })
        )
      )
    ),
    avoid: validate.optional(validate.pipedArrayOf(validate.regex(/^(?:([a-z]{1,3}[:]))?(tolls|highways|ferries|unpaved|congestioncharges|country)$/))),
    avoid_rectangles: validate.optional(
      validate.semicolonArrayOf(
        validate.pipedArrayOf(
          validate.coordinates(
            validate.object({
              lat: validate.latitude,
              lng: validate.longitude
            })
          )
        )
      )
    ),
    avoid_countries: validate.optional(validate.pipedArrayOf(validate.string)),
    vehicle_heading: validate.optional(validate.numberRange(0, 359)),
    speed_profiles: validate.optional(validate.bool),
    traffic: validate.optional(validate.bool),
    toll_segments: validate.optional(validate.bool),
    vehicle_type: validate.optional(validate.oneOf(['car', 'camper', 'van', 'truck', 'pedestrian'])),
    route_computing: validate.optional(validate.oneOf(['fastest', 'shortest', 'economic'])),
    compute_alternatives: validate.optional(validate.bool),
    units: validate.optional(validate.oneOf(['metric', 'imperial'])),
    max_speed: validate.optional(validate.numberRange(1, 255)),
    departure_time: validate.optional(validate.positiveNumber),
    prefer_right_turn: validate.optional(validate.bool),
    dest_in_driving_side: validate.optional(validate.bool),
    total_weight: validate.optional(validate.positiveNumber),
    axle_weight: validate.optional(validate.positiveNumber),
    total_length: validate.optional(validate.positiveNumber),
    width: validate.optional(validate.positiveNumber),
    height: validate.optional(validate.positiveNumber),
    trailers: validate.optional(validate.positiveNumber),
    vehicle_axles: validate.optional(validate.positiveNumber),
    trailer_axles: validate.optional(validate.positiveNumber),
    general_hazard: validate.optional(validate.bool),
    water_hazard: validate.optional(validate.bool),
    emission_class: validate.optional(validate.oneOf(['euro0', 'euro1', 'euro2', 'euro2', 'euro3', 'euro4', 'euro5', 'euro6', 'euroev'])),
    height_at_first_axle: validate.optional(validate.positiveNumber),
    tunnel: validate.optional(validate.oneOf(['b', 'c', 'd', 'e'])),
    steps: validate.optional(validate.bool),
    lang: validate.optional(validate.string)
  })
};

exports.routeMatching = {
  url: 'https://routing.api.sygic.com/v0/api/matching',
  options: {
    method: 'POST'
  },
  validator: validate.object({
    path: validate.string,
    waypoint_indexes: validate.optional(validate.string)
  })
};

exports.roadInfo = {
  url: 'https://routing.api.sygic.com/v0/api/roadinfo',
  validator: validate.object({
    lat: validate.latitude,
    lng: validate.longitude,
    time: validate.optional(validate.positiveNumber),
    vehicle_heading: validate.optional(validate.numberRange(0, 359))
  })
};

exports.distanceMatrix = {
  url: 'https://routing.api.sygic.com/v0/api/distancematrix',
  options: {
    method: 'POST'
  },
  validator: validate.object({
    origins: validate.stringArrayOf(
      validate.coordinates(
        validate.object({
          lat: validate.latitude,
          lng: validate.longitude
        })
      )
    ),
    destinations: validate.stringArrayOf(
      validate.coordinates(
        validate.object({
          lat: validate.latitude,
          lng: validate.longitude
        })
      )
    ),
    route_computing: validate.optional(validate.oneOf(['fastest', 'shortest'])),
    units: validate.optional(validate.oneOf(['metric', 'imperial'])),
    vehicle_type: validate.optional(validate.oneOf(['car', 'truck'])),
    max_speed: validate.optional(validate.numberRange(1, 255))
  })
};

exports.sendToNavi = {
  url: 'https://routing.api.sygic.com/v0/api/sendtonavi',
  options: {
    method: 'POST'
  },
  validator: validate.object({
    name: validate.string,
    tags: validate.regex(/^(login_|id_)\w+$/),
    message: validate.string,
    directions_api_parameters: exports.directions.validator,
    directions_api_result: validate.object({
      route: validate.string,
      legs: validate.array(
        validate.object({
          distance: validate.object({
            value: validate.positiveNumber
          }),
          duration: validate.object({
            value: validate.positiveNumber
          }),
          start_location: validate.object({
            latitude: validate.latitude,
            longitude: validate.longitude
          }),
          end_location: validate.object({
            latitude: validate.latitude,
            longitude: validate.longitude
          })
        })
      )
    })
  })
};