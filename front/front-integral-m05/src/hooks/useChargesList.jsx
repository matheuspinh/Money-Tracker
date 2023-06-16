import { useContext } from "react"
import ChargesListProvider from '../context/ChargesListContext'

function useChargesList() {
  return useContext(ChargesListProvider)
}

export default useChargesList