import { Middleware } from 'swr'
import { SWRActionType } from './context/reducer'
import { useSWRDevtoolsContext } from './context'

export const isMetaCache = (key: string) => {
  return /^\$(?:req|err|ctx|len)\$/.test(key)
}

export const middleware: Middleware = useSWRNext => (key, fetcher, config) => {
  const { dispatch } = useSWRDevtoolsContext()

  const swr = useSWRNext(key, fetcher, config)

  config.onSuccess = data => {
    dispatch({
      type: SWRActionType.ITEM_SUCCESS,
      payload: { key, data }
    })
  }
  config.onError = error => {
    dispatch({
      type: SWRActionType.ITEM_ERROR,
      // @ts-ignore
      payload: { key, error: error.message }
    })
  }

  return swr
}
