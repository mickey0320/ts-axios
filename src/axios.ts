import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const axios = new Axios()
  const instance = axios.request.bind(axios)
  extend(instance, axios)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
