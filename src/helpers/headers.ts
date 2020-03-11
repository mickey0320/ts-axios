import { isPlainObject, deepMerge } from './util'
import { Method } from '../types'

function normalizeHeaders(headers: any, normalizeHeaderName: string) {
  if (!headers) return
  Object.keys(headers).forEach(heaerName => {
    if (
      heaerName !== normalizeHeaderName &&
      heaerName.toUpperCase() === normalizeHeaderName.toUpperCase()
    ) {
      headers[normalizeHeaderName] = headers[heaerName]
      delete headers[heaerName]
    }
  })
}

export function processHeaders(headers: any, data: any) {
  normalizeHeaders(headers, 'Content-Type')
  if (isPlainObject(data) && headers['Content-Type'] == null) {
    headers['Content-Type'] = 'application/json;charset=utf-8'
  }

  return headers
}

export function parseResponseHeaders(headersStr: string) {
  const headersObj = Object.create(null)
  if (!headersStr) return headersObj
  headersStr.split('\r\n').forEach(headerItem => {
    const [key, val] = headerItem.split(':')
    headersObj[key] = val
  })

  return headersObj
}

export function flattenHeaders(headers: any, method: Method) {
  headers = deepMerge(headers.common, headers[method], headers)
  ;[
    'common',
    'get',
    'options',
    'head',
    'put',
    'post',
    'patch',
    'delete'
  ].forEach(action => {
    delete headers[action]
  })

  return headers
}
