import * as validate from '../util/validate';

exports.geocode = {
  url: 'https://geocoding.api.sygic.com/v0/api/geocode',
  validator: validate.construct([
    validate.mutuallyExclusive(['location', 'country']),
    validate.mutuallyExclusive(['location', 'city']),
    validate.mutuallyExclusive(['location', 'street']),
    validate.mutuallyExclusive(['location', 'house_number']),
    validate.object({
      location: validate.optional(validate.string),
      country: validate.optional(validate.string),
      city: validate.optional(validate.string),
      suburb: validate.optional(validate.string),
      street: validate.optional(validate.string),
      house_number: validate.optional(validate.string),
      zip: validate.optional(validate.string),
      admin_level_1: validate.optional(validate.string)
    })
  ])
};

exports.geocodeNorthAmerica = {
  url: 'https://na-geocoding.api.sygic.com/v0/api/geocode?',
  validator: exports.geocode.validator
};

exports.reverseGeocode = {
  url: 'https://geocoding.api.sygic.com/v1/api/reversegeocode',
  validator: validate.object({
    location: validate.coordinates(
      validate.object({
        lat: validate.latitude,
        lng: validate.longitude
      })
    )
  })
};