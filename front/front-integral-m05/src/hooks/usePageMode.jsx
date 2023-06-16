import { useContext } from "react"
import PageModeContext from '../context/PageModeContext'

function usePageMode() {
  return useContext(PageModeContext)
}

export default usePageMode