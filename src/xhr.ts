import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseResponseHeaders } from './helpers/headers'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data, headers, responseType } = config
    const xhr = new XMLHttpRequest()

    if (responseType) {
      xhr.responseType = responseType
    }

    xhr.open(method.toUpperCase(), url, true)
    Object.keys(headers).forEach(headerName => {
      xhr.setRequestHeader(headerName, headers[headerName])
    })
    xhr.send(data)
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return
      const responseHeaders = parseResponseHeaders(xhr.getAllResponseHeaders())
      const responseData = responseType === 'text' ? xhr.responseText : xhr.response
      const response: AxiosResponse = {
        status: xhr.status,
        statusText: xhr.statusText,
        data: responseData,
        headers: responseHeaders,
        xhr,
        config
      }
      resolve(response)
    }
  })
}
