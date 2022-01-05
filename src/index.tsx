import { FC } from 'react'
import { SWRConfig } from 'swr'
import SWRDevtoolsContext from './context'
import { SWRDevtools as DevTools } from './devtools'
import { middleware } from './middleware'

const SWRDevTools: FC = ({ children }) => {
  return (
    <SWRDevtoolsContext>
      <SWRConfig value={{ use: [middleware] }}>
        {children}
        <DevTools />
      </SWRConfig>
    </SWRDevtoolsContext>
  )
}

export default SWRDevTools
