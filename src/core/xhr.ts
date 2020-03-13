import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseResponseHeaders } from '../helpers/headers'
import createError from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'get',
      data,
      headers,
      responseType,
      timeout,
      cancelToken
    } = config
    const xhr = new XMLHttpRequest()

    if (responseType) {
      xhr.responseType = responseType
    }

    if (timeout) {
      xhr.timeout = timeout
    }

    xhr.open(method.toUpperCase(), url!, true)
    Object.keys(headers).forEach(headerName => {
      xhr.setRequestHeader(headerName, headers[headerName])
    })

    if (cancelToken) {
      cancelToken.promise.then(cancel => {
        xhr.abort()
        reject(cancel)
      })
    }
    xhr.send(data)

    xhr.onerror = function() {
      reject(createError('Network error', config, null, xhr))
    }

    xhr.ontimeout = function() {
      reject(
        createError(
          `Timeout of ${timeout} ms exceed`,
          config,
          'ECONNABORTED',
          xhr
        )
      )
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return
      // 网络错误和超时错误都会导致xhr.status=0，所以这个地方不处理，交给onerror或者ontimeout事件处理
      if (xhr.status === 0) return
      const responseHeaders = parseResponseHeaders(xhr.getAllResponseHeaders())
      const responseData =
        responseType === 'text' ? xhr.responseText : xhr.response
      const response: AxiosResponse = {
        status: xhr.status,
        statusText: xhr.statusText,
        data: responseData,
        headers: responseHeaders,
        xhr,
        config
      }
      handleResponse(response)

      function handleResponse(res: AxiosResponse) {
        if (res.status >= 200 && res.status < 300) {
          resolve(res)
        } else {
          reject(
            createError(
              `Response error width status code ${response.status}`,
              config,
              'ECONNABORTED',
              xhr,
              response
            )
          )
        }
      }
    }
  })
}
