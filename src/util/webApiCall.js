import request from 'axios'
import instanceId from '../util/instanceId'

export function webApiCall(options) {
  const apiKey = options.key || ''

  return function (path, query, callback = {}) {
    let queryOptions = query.options || {}
    delete query.options

    if (queryOptions.uid && !query.id) {
      query.id = instanceId.id
    }

    if (queryOptions && queryOptions.method === 'POST') {
      request.post(path, query, {
        params: { key: apiKey }
      })
        .then(function (response) {
          callback(null, response)
        })
        .catch(function (error) {
          callback(error, null)
        })
    } else {
      query.key = apiKey

      request.get(path, {
        params: query
      })
        .then(function (response) {
          callback(null, response)
        })
        .catch(function (error) {
          callback(error, null)
        })
    }
  }
}