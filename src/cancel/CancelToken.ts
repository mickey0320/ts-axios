import { Canceler, CancelExecutor, CancelTokenSource } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  reason?: Cancel
  promise: Promise<Cancel>
  constructor(executor: CancelExecutor) {
    let resolve: ResolvePromise
    this.promise = new Promise(r => {
      resolve = r
    })
    executor((message?: string) => {
      if (this.reason) return
      this.reason = new Cancel(message)
      resolve(this.reason)
    })
  }
  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }
  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })

    return {
      cancel,
      token
    }
  }
}
