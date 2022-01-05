import { createContext, Dispatch, FC, useContext, useReducer } from 'react'
import { Key } from 'swr'
import reducer, { SWRDevToolsActions } from './reducer'

export interface ISWRItem {
  key: Key
  data: any
  error: string | null
  isValidating: boolean
  timestamp: Date
}
interface ISWRContext {
  state: ISWRItem[]
  dispatch: Dispatch<SWRDevToolsActions>
}

export const initialState: ISWRContext = {
  state: [],
  dispatch: () => {}
}
const context = createContext<ISWRContext>(initialState)
export const useSWRDevtoolsContext = () => useContext(context)

const Provider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState.state)
  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  )
}

export default Provider
