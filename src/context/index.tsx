import { createContext, Dispatch, FC, useContext, useReducer } from 'react'
import { Key } from 'swr'
import reducer, { SWRDevToolsActions } from './reducer'

export interface ISWRItem {
  id: string
  key: Key
  data: any
  error: string | null
  isLoading: boolean
  timestamp: Date
  options: any
}
export interface ISWRState {
  cache: ISWRItem[]
  history: ISWRItem[]
}
interface ISWRContext {
  state: ISWRState
  dispatch: Dispatch<SWRDevToolsActions>
}

export const initialState: ISWRContext = {
  state: {
    cache: [],
    history: []
  },
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
