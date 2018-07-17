import * as validate from '../util/validate';

exports.optimization = {
  url: 'https://optimization.api.sygic.com/v0/api/optimization',
  options: {
    method: 'POST'
  },
  validator: validate.object({
    settings: validate.optional(
      validate.object({
        max_wait_time: validate.optional(validate.time),
        routing_mode: validate.optional(validate.oneOf(['fastest', 'shortest', 'aerial'])),
        max_tour_count: validate.optional(validate.numberRange(1, 10)),
        distance_matrix_id: validate.optional(validate.string),
        optimization_level: validate.optional(validate.oneOf(['draft', 'normal', 'heavy']))
      })
    ),
    locations: validate.array(
      validate.object({
        location_id: validate.string,
        coordinates: validate.coordinates(
          validate.object({
            lat: validate.latitude,
            lng: validate.longitude
          })
        ),
        availability: validate.optional(
          validate.array(
            validate.object({
              earliest_start: validate.optional(validate.dateTimeISO8601),
              latest_end: validate.optional(validate.dateTimeISO8601)
            })
          )
        )
      })
    ),
    vehicles: validate.array(
      validate.object({
        vehicle_id: validate.string,
        profile: validate.optional(validate.oneOf(['car', 'truck'])),
        cost_per_km: validate.positiveNumber,
        cost_per_hour: validate.positiveNumber,
        fixed_cost: validate.optional(validate.positiveNumber),
        start_location_id: validate.string,
        end_location_id: validate.string,
        max_capacity: validate.optional(
          validate.array(
            validate.positiveNumber
          )
        ),
        max_total_duration: validate.optional(validate.time),
        max_travel_distance: validate.optional(validate.positiveNumber),
        availability: validate.optional(
          validate.array(
            validate.object({
              earliest_start: validate.optional(validate.dateTimeISO8601),
              latest_end: validate.optional(validate.dateTimeISO8601)
            })
          )
        )
      })
    ),
    tasks: validate.array(
      validate.object({
        task_id: validate.string,
        priority: validate.optional(validate.oneOf(['low', 'normal', 'high', 'critical'])),
        capacity: validate.optional(validate.array(validate.positiveNumber)),
        compatible_vehicles: validate.optional(validate.array(validate.string)),
        activities: validate.array(
          validate.object({
            activity_type: validate.string,
            location_id: validate.array(validate.string),
            service_time: validate.optional(validate.time),
            availability: validate.optional(
              validate.array(
                validate.object({
                  earliest_start: validate.optional(validate.dateTimeISO8601),
                  latest_end: validate.optional(validate.dateTimeISO8601)
                })
              )
            )
          })
        )
      })
    )
  })
};