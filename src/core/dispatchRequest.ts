import { AxiosRequestConfig, AxiosPromise } from '../types'

import xhr from './xhr'
import { handleURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

function dispatchRequest(config: AxiosRequestConfig) {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    res.data = transform(res.data, undefined, config.transformResponse)
    return res
  })
}

function processConfig(config: AxiosRequestConfig) {
  const {
    url,
    params,
    data,
    headers = {},
    method = 'get',
    transformRequest
  } = config
  config.url = handleURL(url!, params)
  config.data = transform(data, headers, transformRequest)
  config.headers = flattenHeaders(headers, method)
}

function throwIfCancellationRequested(config: AxiosRequestConfig) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

export default dispatchRequest
