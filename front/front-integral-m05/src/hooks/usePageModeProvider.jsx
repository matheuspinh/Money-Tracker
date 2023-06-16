import { useState } from "react"
import allOptionsButtons from "../data/allOptionsButtons"

const userDataBase = {
  name: '',
  email: '',
  cpf: '',
  telephone: '',
  password: '',
  confirmationPassword: ''
}
const modalChargeDataBase = {
  idCharge: '',
  name: '',
  value: '',
  expiration: '',
  description: '',
  typeCharge: ''
}

const modalDeleteChargeDataBase = {
  idCharge: '',
  chargeDeadline: '',
  chargePaidOut: ''
}


function usePageModeProvider() {
  const [pageMode, setPageMode] = useState({ ...allOptionsButtons, home: true })
  const [userDataSignUp, setUserDataSignUp] = useState({ name: '', email: '' })
  const [userPassword, setUserPassword] = useState({ password: '', passwordConfirmation: '' })
  const [allowSignUpSucess, setAllowSignUpSucess] = useState(false)
  const [clientsList, setClientsList] = useState([])
  const [userDataEdited, setUserDataEdited] = useState(userDataBase)
  const [listClientWithChargesExpired, setListClientWithChargesExpired] = useState([])
  const [listClientWithChargesPayed, setListClientWithChargesPayed] = useState([])
  const [showRegisterChargeModal, setShowRegisterChargeModal] = useState(false)
  const [userChargeDataToBeRegistered, setUserChargeDataToBeRegistered] = useState({})
  const [showModalEditCharge, setShowModalEditCharge] = useState(false)
  const [dataModalEditCharge, setDataModalEditCharge] = useState(modalChargeDataBase)
  const [showModalChargesDetails, setShowModalChargesDetails] = useState(false)
  const [dataModalChargeDetails, setDataModalChargeDetails] = useState(modalChargeDataBase)
  const [showModalDeleteCharge, setShowModalDeleteCharge] = useState(false)
  const [dataModalDeleteCharge, setDataModalDeleteCharge] = useState(modalDeleteChargeDataBase)
  const [chargeUniqueClient, setChargeUniqueClient] = useState([])





  return {
    pageMode, setPageMode,
    userDataSignUp, setUserDataSignUp,
    userPassword, setUserPassword,
    allowSignUpSucess, setAllowSignUpSucess,
    clientsList, setClientsList,
    userDataEdited, setUserDataEdited,
    listClientWithChargesExpired, setListClientWithChargesExpired,
    listClientWithChargesPayed, setListClientWithChargesPayed,
    showRegisterChargeModal, setShowRegisterChargeModal,
    userChargeDataToBeRegistered, setUserChargeDataToBeRegistered,
    showModalEditCharge, setShowModalEditCharge,
    dataModalEditCharge, setDataModalEditCharge,
    showModalChargesDetails, setShowModalChargesDetails,
    dataModalChargeDetails, setDataModalChargeDetails,
    showModalDeleteCharge, setShowModalDeleteCharge,
    dataModalDeleteCharge, setDataModalDeleteCharge,
    chargeUniqueClient, setChargeUniqueClient
  };
};

export default usePageModeProvider;