import { Middleware } from 'swr'
import { SWRActionType } from './context/reducer'
import { useSWRDevtoolsContext } from './context'

export const isMetaCache = (key: string) => {
  return /^\$(?:req|err|ctx|len)\$/.test(key)
}

export const middleware: Middleware = useSWRNext => (key, fetcher, options) => {
  const { dispatch } = useSWRDevtoolsContext()
  const customOptions = {
    fallback: options.fallback,
    revalidateOnFocus: options.revalidateOnFocus,
    revalidateOnReconnect: options.revalidateOnReconnect,
    revalidateIfStale: options.revalidateIfStale,
    shouldRetryOnError: options.shouldRetryOnError,
    errorRetryInterval: options.errorRetryInterval,
    focusThrottleInterval: options.focusThrottleInterval,
    dedupingInterval: options.dedupingInterval,
    loadingTimeout: options.loadingTimeout
  }

  const swr = useSWRNext(key, fetcher, options)

  options.onSuccess = data => {
    dispatch({
      type: SWRActionType.ITEM_SUCCESS,
      payload: { key, data, options: customOptions }
    })
  }
  options.onError = error => {
    dispatch({
      type: SWRActionType.ITEM_ERROR,
      // @ts-ignore
      payload: { key, error: error.message, options: customOptions }
    })
  }

  return swr
}
