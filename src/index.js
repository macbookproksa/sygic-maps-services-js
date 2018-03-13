import { geocode, geocodeNorthAmerica, reverseGeocode, reverseGeocodeNorthAmerica } from './api/geocoding';
import { directions, matching, roadInfo, distanceMatrix, sendToNavi } from './api/routing';
import { autocomplete, autocompleteDetails } from './api/search';
import { optimization } from './api/optimization';
import { webApiCall } from './util/webApiCall';

function create(options = {}) {
  let apiCall = webApiCall(options);

  function createApiMethod(config) {
    return function(query, callback) {
      let apiQuery = config.validator(query);
      apiQuery.options = config.options;

      return apiCall(config.url, apiQuery, callback);
    };
  }

  return {
    geocode: createApiMethod(geocode),
    geocodeNorthAmerica: createApiMethod(geocodeNorthAmerica),
    reverseGeocode: createApiMethod(reverseGeocode),
    reverseGeocodeNorthAmerica: createApiMethod(reverseGeocodeNorthAmerica),
    directions: createApiMethod(directions),
    matching: createApiMethod(matching),
    roadInfo: createApiMethod(roadInfo),
    distanceMatrix: createApiMethod(distanceMatrix),
    autocomplete: createApiMethod(autocomplete),
    autocompleteDetails: createApiMethod(autocompleteDetails),
    optimization: createApiMethod(optimization),
    sendToNavi: createApiMethod(sendToNavi)
  };
};

module.exports = {
  create: create
};