import { Key } from 'swr'
import { initialState, ISWRItem } from '.'
export enum SWRActionType {
  ITEM_SUCCESS = 'ITEM_SUCCESS',
  ITEM_ERROR = 'ITEM_ERROR',
  ITEM_VALIDATING = 'ITEM_VALIDATING',
  ITEM_DELETE = 'ITEM_DELETE'
}

export type SWRDevToolsActions =
  | {
      type: SWRActionType.ITEM_SUCCESS
      payload: { key: Key; data: any }
    }
  | { type: SWRActionType.ITEM_ERROR; payload: { key: Key; error: string } }
  | { type: SWRActionType.ITEM_DELETE; payload: { key: Key } }
  | {
      type: SWRActionType.ITEM_VALIDATING
      payload: { key: Key }
    }

const reducer = (
  state: ISWRItem[] = initialState.state,
  action: SWRDevToolsActions
): ISWRItem[] => {
  switch (action.type) {
    case SWRActionType.ITEM_VALIDATING: {
      const item = state.find(x => x.key === action.payload.key)
      const OtherItems = state.filter(x => x.key !== action.payload.key)
      return [
        ...OtherItems,
        {
          key: action.payload.key,
          data: item?.data ?? null,
          error: item?.error ?? null,
          isValidating: true,
          timestamp: new Date()
        }
      ]
    }
    case SWRActionType.ITEM_SUCCESS: {
      const items = state.filter(x => x.key !== action.payload.key)
      return [
        ...items,
        {
          key: action.payload.key,
          data: action.payload.data,
          error: null,
          isValidating: false,
          timestamp: new Date()
        }
      ]
    }
    case SWRActionType.ITEM_DELETE: {
      const items = state.filter(x => x.key !== action.payload.key)
      return items
    }
    case SWRActionType.ITEM_ERROR: {
      const item = state.find(x => x.key === action.payload.key)
      const items = state.filter(x => x.key !== action.payload.key)
      return [
        ...items,
        {
          key: action.payload.key,
          data: item?.data ?? null,
          error: action.payload.error,
          isValidating: false,
          timestamp: new Date()
        }
      ]
    }
    default:
      return state
  }
}

export default reducer
