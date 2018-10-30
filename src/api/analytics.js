import * as validate from '../util/validate'

export let mapMatching = {
  url: 'https://analytics.api.sygic.com/v1/api/matching',
  options: {
    method: 'POST'
  },
  validator: validate.construct([
    validate.mutuallyExclusive(['path', 'coordinates']),
    validate.object({
      path: validate.optional(validate.string),
      coordinates: validate.optional(
        validate.stringArrayOf(
          validate.coordinates(
            validate.object({
              lat: validate.latitude,
              lng: validate.longitude
            })
          )
        )
      ),
      accuracies: validate.optional(
        validate.array(
          validate.positiveNumber
        )
      ),
      timestamps: validate.optional(
        validate.array(
          validate.positiveNumber
        )
      ),
      units: validate.optional(validate.oneOf(['metric', 'imperial']))
    })
  ])
}

export let speedingReport = {
  url: 'https://analytics.api.sygic.com/v0/api/speeding',
  options: {
    method: 'POST'
  },
  validator: validate.object({
    coordinates: validate.stringArrayOf(
      validate.coordinates(
        validate.object({
          lat: validate.latitude,
          lng: validate.longitude
        })
      )
    ),
    accuracies: validate.optional(
      validate.array(
        validate.positiveNumber
      )
    ),
    speeds: validate.optional(
      validate.array(
        validate.positiveNumber
      )
    ),
    timestamps: validate.optional(
      validate.array(
        validate.positiveNumber
      )
    ),
    units: validate.optional(validate.oneOf(['metric', 'imperial']))
  })
}