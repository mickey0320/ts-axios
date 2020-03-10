import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
  // .replace(/%40/g, '@')
  // .replace(/%3A/gi, ':')
  // .replace(/%24/g, '$')
  // .replace(/%2C/gi, ',')
  // .replace(/%20/g, '+')
  // .replace(/%5B/gi, '[')
  // .replace(/%5D/gi, ']')
}

export function handleURL(url: string, params?: any): string {
  if (!params) return url
  const parts: any[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(value => {
      if (value == null) return
      if (isDate(value)) {
        value = value.toISOString()
      } else if (isPlainObject(value)) {
        value = JSON.stringify(value)
      }
      parts.push(`${encode(key)}=${encode(value)}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams === '') {
    return url
  }
  if (url.includes('#')) {
    url = url.slice(0, url.indexOf('#'))
  }
  if (url.includes('?')) {
    url += `&${serializedParams}`
  } else {
    url += `?${serializedParams}`
  }

  return url
}
