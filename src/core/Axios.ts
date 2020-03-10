import { AxiosRequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  // request(config: AxiosRequestConfig) {
  //   return dispatchRequest(config)
  // }
  request(url?: any, config?: AxiosRequestConfig) {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    return dispatchRequest(config!)
  }
  private requestWithoutData(
    url: string,
    method: Method,
    config: AxiosRequestConfig
  ) {
    return this.request({
      ...config,
      url,
      method
    })
  }
  private requestWithData(
    url: string,
    method: Method,
    data: any,
    config: AxiosRequestConfig
  ) {
    return this.request({
      ...config,
      url,
      method,
      data
    })
  }
  get(url: string, config: AxiosRequestConfig) {
    return this.requestWithoutData(url, 'get', config)
  }
  head(url: string, config: AxiosRequestConfig) {
    return this.requestWithoutData(url, 'head', config)
  }
  options(url: string, config: AxiosRequestConfig) {
    return this.requestWithoutData(url, 'options', config)
  }
  delete(url: string, data: any, config: AxiosRequestConfig) {
    return this.requestWithoutData(url, 'delete', config)
  }
  post(url: string, data: any, config: AxiosRequestConfig) {
    return this.requestWithData(url, 'post', data, config)
  }
  put(url: string, data: any, config: AxiosRequestConfig) {
    return this.requestWithData(url, 'put', data, config)
  }
  patch(url: string, data: any, config: AxiosRequestConfig) {
    return this.requestWithData(url, 'patch', data, config)
  }
}
