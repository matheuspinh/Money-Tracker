import './styles.css'

import api from '../../services/api'
import ClientIcon from '../../assets/client-icon-tools-bar-unselected.png'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getItem } from '../../utils/localStorage'
import usePageMode from '../../hooks/usePageMode'
import SuccessIcon from '../../assets/success-check.svg'
import CloseIcon from '../../assets/close-img.svg'
import Header from '../../components/Header'
import ModalEditUser from '../../components/ModalEditUser'
import ToolsBar from '../../components/ToolsBar'
import ClientInformationCard from '../../components/ClientInformationCard'
import ClientModal from '../../components/ClientModal'
import SingleClientChargeTable from '../../components/SingleClientChargeTable'
import ModalRegisterCharge from '../../components/ModalRegisterCharge'
import FeedbackBoxMessage from '../../components/FeedbackBoxMessage'
import ModalEditCharge from '../../components/ModalEditCharge'
import ModalChargeDetails from '../../components/ModalChargeDetails'
import ModalDeleteCharge from '../../components/ModalDeleteCharge'

export default function SingleClient() {
  const {
    clientsList,
    setClientsList,
    showRegisterChargeModal,
    showModalEditCharge,
    dataModalEditCharge,
    setDataModalEditCharge,
    showModalChargesDetails,
    showModalDeleteCharge } = usePageMode()

  const [showEditClientModal, setShowEditClientModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const [client, setClient] = useState({})
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false)
  const [showSucessRegisterCharge, setShowSucessRegisterCharge] = useState(false)
  const [showSucessDeleteCharge, setShowSucessDeleteCharge] = useState(false)
  const [showFailDeleteCharge, setShowFailDeleteCharge] = useState(false)
  const [showSucessEditCharge, setShowSucessEditCharge] = useState(false)
  const { id } = useParams()

  const navigate = useNavigate()

  const token = getItem('token')

  const handleOpenFeedback = () => {
    const feedBackTimeout = setTimeout((() => { setShowFeedbackMessage(true) }), 1000)
    return
  }
  const handleOpenSucessRegisterCharge = () => {
    setTimeout(() => {
      setShowSucessRegisterCharge(true)
    }, 1000);
  }
  const handleOpenSucessDeleteCharge = () => {
    setTimeout(() => {
      setShowSucessDeleteCharge(true)
    }, 1000);
  }
  const handleOpenFailDeleteCharge = () => {
    return setShowFailDeleteCharge(true)
  }

  const handleCloseFeedback = () => {
    return setShowFeedbackMessage(false)
  }
  const handleCloseSucessRegisterCharge = () => {
    return setShowSucessRegisterCharge(false)
  }
  const handleCloseSucessDeleteCharge = () => {
    return setShowSucessDeleteCharge(false)
  }
  const handleCloseFailDeleteCharge = () => {
    return setShowFailDeleteCharge(false)
  }

  const handleOpenSucessEditCharge = () => {
    setTimeout(() => {
      setShowSucessEditCharge(true)
    }, 1000)
  }
  const handleCloseSucessEditCharge = () => {
    setShowSucessEditCharge(false)
  }


  async function getClientList() {
    const token = getItem('token')

    try {
      const response = await api.get('/cliente', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setClientsList(response.data)
    } catch (error) {

    }
  }



  async function getSingleUser() {
    try {
      const response = await api.get(`/cliente/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const responseObj = {
        id: response.data.id,
        name: response.data.nome || '',
        email: response.data.email || '',
        phoneNumber: response.data.telefone || '',
        cpf: response.data.cpf || '',
        publicPlace: response.data.endereco || '',
        neighborhood: response.data.bairro || '',
        addressComplement: response.data.complemento || '',
        zipCode: response.data.cep || '',
        city: response.data.cidade || '',
        federalState: response.data.uf || ''
      }

      setClient(responseObj)
      setDataModalEditCharge({ ...dataModalEditCharge, name: responseObj.name })
    } catch (error) {
      navigate('/clients')
    }
  }

  useEffect(() => {
    if (!clientsList || !clientsList.length) {
      getClientList()
    }
  }, [clientsList])

  useEffect(() => {
    getSingleUser()
  }, []);

  useEffect(() => {
    if (!client) {
      navigate('/clients')
    }
  }, [client])

  return (
    <>
      <div className="single-client-container">
        <ToolsBar
          pageMode='clients'
        />
        <div className="single-client-page-content">
          <Header
            pageMode={'single-client'}
            setShowModal={setShowUserModal}
            userMenu={userMenu}
            setUserMenu={setUserMenu}
          />
          <div className="client-name-bar">
            <img src={ClientIcon} alt="Icone do Cliente" />
            <h1
              className="client-name-single-client-page"
            >
              {client && client.name}
            </h1>
          </div>
          <ClientInformationCard
            client={client}
            setClient={setClient}
            setShowEditClientModal={setShowEditClientModal}
          />
          <SingleClientChargeTable
            idClient={id}
          />
        </div>
      </div>

      {
        showFeedbackMessage &&
        <FeedbackBoxMessage
          handleCloseFeedback={handleCloseFeedback}
        >
          Edições do cadastro concluídas com sucesso
        </FeedbackBoxMessage>
      }
      {
        showSucessRegisterCharge &&
        <FeedbackBoxMessage
          handleCloseFeedback={handleCloseSucessRegisterCharge}
        >
          Cobrança cadastrada com sucesso
        </FeedbackBoxMessage>
      }

      {
        showSucessDeleteCharge &&
        <FeedbackBoxMessage
          handleCloseFeedback={handleCloseSucessDeleteCharge}
        >
          Cobrança excluída com sucesso!
        </FeedbackBoxMessage>
      }
      {
        showFailDeleteCharge &&
        <FeedbackBoxMessage
          type={'fail'}
          handleCloseFeedback={handleCloseFailDeleteCharge}
        >
          Esta cobrança não pode ser excluída!
        </FeedbackBoxMessage>
      }

      {
        showEditClientModal &&
        <ClientModal
          handleOpenFeedback={handleOpenFeedback}
          setShowNewClientModal={setShowEditClientModal}
          editMode={true}
          editClientData={client}
          setEditClientData={setClient}
        />
      }

      {
        showUserModal &&
        <ModalEditUser
          setShowUserModal={setShowUserModal}
        />
      }

      {
        showRegisterChargeModal &&
        <ModalRegisterCharge
          handleOpenSucessRegisterCharge={handleOpenSucessRegisterCharge}
        />
      }

      {
        showModalChargesDetails &&
        <ModalChargeDetails />
      }

      {
        showModalEditCharge &&
        <ModalEditCharge
          handleOpenSucessEditCharge={handleOpenSucessEditCharge}
        />
      }

      {
        showModalDeleteCharge &&
        <ModalDeleteCharge
          handleOpenSucessDeleteCharge={handleOpenSucessDeleteCharge}
          handleOpenFailDeleteCharge={handleOpenFailDeleteCharge}
        />
      }

      {
        showSucessEditCharge &&
        <FeedbackBoxMessage
          handleCloseFeedback={handleCloseSucessEditCharge}
        >
          Cobrança editada com sucesso!
        </FeedbackBoxMessage>
      }
    </>
  )
};