import * as validate from '../util/validate';

exports.autocomplete = {
  url: 'https://search.api.sygic.com/v0/api/autocomplete',
  validator: validate.object({
    query: validate.string,
    lat: validate.optional(
      validate.latitude
    ),
    lng: validate.optional(
      validate.longitude
    ),
    includeDetails: validate.optional(
      validate.bool
    )
  })
};

exports.autocompleteDetails = {
  url: 'https://search.api.sygic.com/v0/api/details',
  validator: validate.object({
    resultId: validate.string
  })
};