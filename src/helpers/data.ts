import { isPlainObject } from './util'

export function transformRequest(data: any) {
  if (isPlainObject(data)) {
    data = JSON.stringify(data)
  }

  return data
}

export function transformReponse(responseData: any) {
  if (typeof responseData === 'string') {
    try {
      responseData = JSON.parse(responseData)
    } catch (ex) {
      // todo
    }
  }

  return responseData
}
