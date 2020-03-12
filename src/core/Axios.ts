import {
  AxiosRequestConfig,
  Method,
  AxiosResponse,
  ResolveFn,
  RejectFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T = any> {
  resolve: ResolveFn<T> | ((config: AxiosRequestConfig) => AxiosResponse)
  reject?: RejectFn
}

export default class Axios {
  public defaults: AxiosRequestConfig
  private interceptors: Interceptors
  constructor(defaultConfig: AxiosRequestConfig) {
    this.defaults = defaultConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }
  request(url: any, config?: AxiosRequestConfig) {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    config = mergeConfig(this.defaults, config!)
    const promiseChain: PromiseChain[] = [
      {
        resolve: dispatchRequest,
        reject: undefined
      }
    ]
    this.interceptors.request.forEach(interceptor => {
      promiseChain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor => {
      promiseChain.push(interceptor)
    })
    let promise = Promise.resolve(config!)
    while (promiseChain.length) {
      const { resolve, reject } = promiseChain.shift()!
      promise = promise.then(resolve, reject)
    }

    return promise
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
