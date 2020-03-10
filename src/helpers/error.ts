import { AxiosRequestConfig, AxiosResponse } from '../types'

class AxiosError extends Error {
  constructor(
    message: string,
    private config: AxiosRequestConfig,
    private code?: string | null,
    private xhr?: any,
    private response?: AxiosResponse
  ) {
    super()
    this.message = message
    this.config = config
    this.code = code
    this.xhr = xhr
    this.response = response

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export default function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  xhr?: XMLHttpRequest,
  response?: AxiosResponse
) {
  return new AxiosError(message, config, code, xhr, response)
}
