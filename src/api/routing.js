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
    speed_profiles: validate.optional(validate.bool),
    traffic: validate.optional(validate.bool),
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
    avoid: validate.optional(
      validate.pipedArrayOf(
        validate.oneOf(['tolls', 'highways', 'ferries', 'unpaved'])
      )
    ),
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
    avoid_countries: validate.optional(
      validate.pipedArrayOf(validate.string)
    ),
    vehicle_heading: validate.optional(
      validate.numberRange(0, 359)
    ),
    vehicle_type: validate.optional(
      validate.oneOf(['car', 'camper', 'van', 'truck'])
    ),
    route_computing: validate.optional(
      validate.oneOf(['fastest', 'shortest', 'economic'])
    ),
    compute_alternatives: validate.optional(validate.bool),
    units: validate.optional(
      validate.oneOf(['metric', 'imperial'])
    ),
    max_speed: validate.optional(
      validate.numberRange(1, 255)
    ),
    departure_time: validate.optional(
      validate.positiveNumber
    ),
    prefer_right_turn: validate.optional(
      validate.bool
    ),
    dest_in_driving_side: validate.optional(
      validate.bool
    ),
    total_weight: validate.optional(
      validate.positiveNumber
    ),
    axle_weight: validate.optional(
      validate.positiveNumber
    ),
    total_length: validate.optional(
      validate.positiveNumber
    ),
    width: validate.optional(
      validate.positiveNumber
    ),
    height: validate.optional(
      validate.positiveNumber
    ),
    trailers: validate.optional(
      validate.positiveNumber
    ),
    vehicle_axles: validate.optional(
      validate.positiveNumber
    ),
    general_hazard: validate.optional(
      validate.bool
    ),
    water_hazard: validate.optional(
      validate.bool
    ),
    tunnel: validate.optional(
      validate.oneOf(['b', 'c', 'd', 'e'])
    ),
    steps: validate.optional(
      validate.bool
    ),
    lang: validate.optional(
      validate.string
    )
  })
};

exports.matching = {
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
    vehicle_heading: validate.optional(
      validate.numberRange(0, 359)
    )
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
    route_computing: validate.optional(
      validate.oneOf(['fastest', 'shortest'])
    ),
    units: validate.optional(
      validate.oneOf(['metric', 'imperial'])
    ),
    vehicle_type: validate.optional(
      validate.oneOf(['car', 'truck', 'heavytruck'])
    ),
    max_speed: validate.optional(
      validate.numberRange(1, 255)
    )
  })
};

exports.sendToNavi = {
  url: 'https://routing.api.sygic.com/v0/api/sendtonavi',
  options: {
    method: 'POST'
  },
  validator: validate.object({
    message: validate.optional(
      validate.string
    ),
    name: validate.string,
    tags: validate.string,
    directions_api_parameters: exports.directions.validator
  })
};