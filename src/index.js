import { geocode, geocodeNorthAmerica, reverseGeocode } from './api/geocoding'
import { directions, routeMatching, roadInfo, distanceMatrix, sendToNavi } from './api/routing'
import { autocomplete, autocompleteDetails } from './api/search'
import { optimization } from './api/optimization'
import { mapMatching, speedingReport } from './api/analytics'
import { webApiCall } from './util/webApiCall'

function create (options = {}) {
  let apiCall = webApiCall(options)

  function createApiMethod (config) {
    return function (query, callback) {
      let apiQuery = config.validator(query)
      apiQuery.options = config.options

      return apiCall(config.url, apiQuery, callback)
    }
  }

  return {
    geocode: createApiMethod(geocode),
    geocodeNorthAmerica: createApiMethod(geocodeNorthAmerica),
    reverseGeocode: createApiMethod(reverseGeocode),
    directions: createApiMethod(directions),
    routeMatching: createApiMethod(routeMatching),
    roadInfo: createApiMethod(roadInfo),
    distanceMatrix: createApiMethod(distanceMatrix),
    autocomplete: createApiMethod(autocomplete),
    autocompleteDetails: createApiMethod(autocompleteDetails),
    optimization: createApiMethod(optimization),
    sendToNavi: createApiMethod(sendToNavi),
    mapMatching: createApiMethod(mapMatching),
    speedingReport: createApiMethod(speedingReport)
  }
}

module.exports = {
  create: create
}