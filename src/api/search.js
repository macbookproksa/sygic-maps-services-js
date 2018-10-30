import * as validate from '../util/validate'

exports.autocomplete = {
  url: 'https://search.api.sygic.com/v0/api/autocomplete',
  options: {
    uid: true
  },
  validator: validate.construct([
    validate.together(['boundaryLeft', 'boundaryRight', 'boundaryTop', 'boundaryBottom']),
    validate.object({
      query: validate.string,
      lat: validate.optional(validate.latitude),
      lon: validate.optional(validate.longitude),
      boundaryLeft: validate.optional(validate.longitude),
      boundaryRight: validate.optional(validate.longitude),
      boundaryTop: validate.optional(validate.latitude),
      boundaryBottom: validate.optional(validate.latitude),
      id: validate.optional(validate.string),
      typeFilter: validate.optional(validate.oneOf(['country', 'postal_code', 'city', 'street', 'address', 'postal_address', 'poi_group', 'poi_category', 'poi'])),
      regionFilter: validate.optional(validate.oneOf(['europe', 'north_america'])),
      countryFilter: validate.optional(validate.string),
      lang: validate.optional(validate.string)
    })
  ])
}

exports.autocompleteDetails = {
  url: 'https://search.api.sygic.com/v0/api/details',
  validator: validate.object({ resultId: validate.string })
}