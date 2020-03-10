export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  xhr: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string | null
  xhr?: any
  response?: AxiosResponse
}

export interface Axios {
  request: <T>(config: AxiosRequestConfig) => AxiosPromise<T>
  get: <T>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>
  head: <T>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>
  options: <T>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>
  delete: <T>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>
  post: <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ) => AxiosPromise<T>
  put: <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ) => AxiosPromise<T>
  patch: <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ) => AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T>(config: AxiosRequestConfig): AxiosPromise<T>
  <T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
