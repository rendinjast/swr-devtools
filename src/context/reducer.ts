import { Key } from 'swr'
import { initialState, ISWRState } from '.'
export enum SWRActionType {
  ITEM_SUCCESS = 'ITEM_SUCCESS',
  ITEM_ERROR = 'ITEM_ERROR',
  ITEM_LOADING = 'ITEM_LOADING',
  ITEM_DELETE = 'ITEM_DELETE'
}
const GenId = () => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export type SWRDevToolsActions =
  | {
      type: SWRActionType.ITEM_SUCCESS
      payload: { key: Key; data: any; options: any }
    }
  | {
      type: SWRActionType.ITEM_ERROR
      payload: { key: Key; error: string; options: any }
    }
  | { type: SWRActionType.ITEM_DELETE; payload: { key: Key } }
  | {
      type: SWRActionType.ITEM_LOADING
      payload: { key: Key; options: any }
    }

const reducer = (
  state: ISWRState = initialState.state,
  action: SWRDevToolsActions
): ISWRState => {
  switch (action.type) {
    case SWRActionType.ITEM_LOADING: {
      const find = state.cache.find(x => x.key === action.payload.key)
      const OtherItems = state.cache.filter(x => x.key !== action.payload.key)
      const item = {
        id: GenId(),
        key: action.payload.key,
        data: find?.data ?? null,
        error: find?.error ?? null,
        isLoading: true,
        timestamp: new Date(),
        options: action.payload.options
      }
      return {
        history: [...state.history, item],
        cache: [...OtherItems, item]
      }
    }
    case SWRActionType.ITEM_SUCCESS: {
      const items = state.cache.filter(x => x.key !== action.payload.key)
      const item = {
        id: GenId(),
        key: action.payload.key,
        data: action.payload.data,
        error: null,
        isLoading: false,
        timestamp: new Date(),
        options: action.payload.options
      }
      return {
        history: [...state.history, item],
        cache: [...items, item]
      }
    }
    case SWRActionType.ITEM_DELETE: {
      const items = state.cache.filter(x => x.key !== action.payload.key)
      const item = {
        id: GenId(),
        key: action.payload.key,
        data: null,
        error: null,
        isLoading: false,
        timestamp: new Date(),
        options: null
      }
      return {
        history: [...state.history, item],
        cache: items
      }
    }
    case SWRActionType.ITEM_ERROR: {
      const find = state.cache.find(x => x.key === action.payload.key)
      const items = state.cache.filter(x => x.key !== action.payload.key)
      const item = {
        id: GenId(),
        key: action.payload.key,
        data: find?.data ?? null,
        error: action.payload.error,
        isLoading: false,
        timestamp: new Date(),
        options: action.payload.options
      }
      return {
        history: [...state.history, item],
        cache: [...items]
      }
    }
    default:
      return state
  }
}

export default reducer
