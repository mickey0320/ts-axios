import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/util'

type ConfigKey = keyof AxiosRequestConfig

const strats = Object.create(null)

function defaultStrat(val1: any, val2: any) {
  return val2 !== undefined ? val2 : val1
}

function fromVal2Strat(val: any, val2: any) {
  return val2
}

function deepMergeStrat(val1: any, val2: any) {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

;['url', 'data', 'params'].forEach(field => {
  strats[field] = fromVal2Strat
})
;['headers'].forEach(field => {
  strats[field] = deepMergeStrat
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig
): AxiosRequestConfig {
  const config = Object.create(null)
  for (let key in config1) {
    merge(key as ConfigKey)
  }
  for (let key in config2) {
    if (!config1[key as ConfigKey]) {
      merge(key as ConfigKey)
    }
  }

  function merge(key: ConfigKey) {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2[key])
  }

  return config
}
