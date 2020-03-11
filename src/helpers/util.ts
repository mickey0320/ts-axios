const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
export function isObject(val: any): boolean {
  return val !== null && typeof val === 'object'
}
export function isPlainObject(val: any): val is object {
  return toString.call(val) === '[object Object]'
}
export function extend<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}

export function deepMerge(...arrObj: any[]) {
  const ret = Object.create(null)

  arrObj.forEach(obj => {
    Object.keys(obj).forEach(key => {
      const val = obj[key]
      if (isPlainObject(val)) {
        if (isPlainObject(ret[key])) {
          ret[key] = deepMerge(ret[key], val)
        } else {
          ret[key] = deepMerge(val)
        }
      } else {
        ret[key] = val
      }
    })
  })

  return ret
}
