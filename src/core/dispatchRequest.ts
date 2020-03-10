import { AxiosRequestConfig, AxiosPromise } from '../types'

import xhr from './xhr'
import { handleURL } from '../helpers/url'
import { transformRequest, transformReponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

function dispatchRequest(config: AxiosRequestConfig) {
  processConfig(config)
  return xhr(config).then(res => {
    res.data = transformReponse(res.data)
    return res
  })
}

function processConfig(config: AxiosRequestConfig) {
  const { url, params, data, headers = {} } = config
  config.url = handleURL(url!, params)
  config.headers = processHeaders(headers, data)
  config.data = transformRequest(data)
}

export default dispatchRequest
