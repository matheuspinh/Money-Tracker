import { createContext } from 'react'
import useChargesListProvider from '../hooks/useChargesListProvider'

const ChargesListContext = createContext({})

export function ChargesListProvider(props) {
  const chargesProvider = useChargesListProvider()
  return (
    <ChargesListContext.Provider value={chargesProvider}>
      {props.children}
    </ChargesListContext.Provider>
  );
};

export default ChargesListContext;