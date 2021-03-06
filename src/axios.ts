import { AxiosStatic, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend, deepMerge } from './helpers/util'
import defaults from './defaults'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(defaultConfig: AxiosRequestConfig): AxiosStatic {
  const axios = new Axios(defaultConfig)
  const instance = axios.request.bind(axios)
  extend(instance, axios)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)
axios.create = function(config: AxiosRequestConfig) {
  return createInstance(deepMerge(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
