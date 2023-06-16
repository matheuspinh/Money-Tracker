import { useState } from "react"

function useChargesListProvider() {
  const [chargesList, setChargesList] = useState([])
  const [listChargesPayed, setListChargesPayed] = useState([])
  const [listChargesPredicted, setListChargesPredicted] = useState([])
  const [listChargesExpired, setListChargesExpired] = useState([])

  return {
    chargesList, setChargesList,
    listChargesPayed, setListChargesPayed,
    listChargesPredicted, setListChargesPredicted,
    listChargesExpired, setListChargesExpired
  }
}

export default useChargesListProvider