import { createContext } from 'react'
import usePageModeProvider from '../hooks/usePageModeProvider'

const PageModeContext = createContext({})

export function PageModeProvider(props) {
  const useProvider = usePageModeProvider()
  return (
    <PageModeContext.Provider value={useProvider}>
      {props.children}
    </PageModeContext.Provider>
  );
};

export default PageModeContext