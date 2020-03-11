import { ResolveFn, RejectFn } from '../types'

interface Interceptor<T> {
  resolve: ResolveFn<T>
  reject?: RejectFn
}
export default class InterceptorManager<T> {
  private interceptors: (Interceptor<T> | null)[] = []
  use(resolve: ResolveFn<T>, reject?: RejectFn) {
    this.interceptors.push({
      resolve,
      reject
    })

    return this.interceptors.length - 1
  }
  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
  forEach(fn: (arg: Interceptor<T>) => void) {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) fn(interceptor)
    })
  }
}
