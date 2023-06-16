import './styles.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import api from '../../services/api'

import Header from '../../components/Header'
import ToolsBar from '../../components/ToolsBar'

import ChargeDetails from '../../components/ChargeDetails/index'
import ChargesSummary from '../../components/ChargesSummary/index'
import ClientsCardResume from '../../components/ClientsCardResume/index'
import ModalEditUser from '../../components/ModalEditUser'
import useChargesList from '../../hooks/useChargesList'
import usePageMode from '../../hooks/usePageMode'
import LoadingModal from '../../components/LoadingModal'
import { getItem } from '../../utils/localStorage'

function Home() {
  const {
    listChargesPayed,
    setListChargesPayed,
    listChargesPredicted,
    setListChargesPredicted,
    listChargesExpired,
    setListChargesExpired } = useChargesList()
  const {
    setListClientWithChargesExpired,
    setListClientWithChargesPayed } = usePageMode()

  const [listAllCharges, setListAllCharges] = useState([])
  const [showUserModal, setShowUserModal] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const token = localStorage.getItem('token')

  async function getClientList() {

    try {
      const response = await api.get('/cliente', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const listAllClients = response.data

      const clientsExpired = listAllClients.filter((client) => {
        return client.emDia === false
      })

      const clientsPayed = listAllClients.filter((client) => {
        return client.emDia === true
      })

      setListClientWithChargesExpired(clientsExpired)
      setListClientWithChargesPayed(clientsPayed)

    } catch (error) {
      return
    }
  }

  useEffect(() => {
    const dateISOFormatted = (date) => date.toISOString().split('T')[0]

    const getChargesList = async () => {
      try {
        setIsLoading(true)
        const responseGetChargeList = await api.get('/cobranca', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const chargesList = await responseGetChargeList.data
        const dateToday = dateISOFormatted(new Date())


        const localListChargesPayed = [];
        const localListChargesPredicted = []
        const localListChargesExpired = []

        chargesList.map((charge) => {
          if (charge.pago === true) {
            localListChargesPayed.push(charge)
          }

          if (charge.vencimento.split('T')[0] >= dateToday && charge.pago === false) {
            localListChargesPredicted.push(charge)
          }

          if (charge.vencimento.split('T')[0] < dateToday && charge.pago === false) {
            localListChargesExpired.push(charge)
          }
        })

        setListChargesPayed(localListChargesPayed)
        setListChargesPredicted(localListChargesPredicted)
        setListChargesExpired(localListChargesExpired)

        getClientList()
        return
      } catch (error) {
        return
      } finally {
        setIsLoading(false)
      }
    }

    getChargesList()
  }, [])

  const sumValues = (listCharges) => {
    let totalValues = 0
    listCharges.map((charge) => {
      totalValues += charge.valor
    })

    return totalValues
  }

  const sumPaidCharges = {
    amount: sumValues(listChargesPayed),
    type: 'paid',
  }
  const sumPredictedCharges = {
    amount: sumValues(listChargesPredicted),
    type: 'predicted',
  }
  const sumOverdueCharges = {
    amount: sumValues(listChargesExpired),
    type: 'overdue',
  }

  return (
    <>
      <div className="home-container">
        <ToolsBar
          pageMode='home'
        />
        <div className="home-page-content">
          <Header
            pageMode={'home'}
            setShowModal={setShowUserModal}
            userMenu={userMenu}
            setUserMenu={setUserMenu}
          />

          <div className='container-charges-summary'>
            <ChargesSummary
              chargeSummaryData={sumPaidCharges}
            />
            <ChargesSummary
              chargeSummaryData={sumPredictedCharges}
            />
            <ChargesSummary
              chargeSummaryData={sumOverdueCharges}
            />
          </div>

          <div className='container-charge-details-page'>
            <ChargeDetails
              type='payed'
              listChargesData={listChargesPayed}
            >
              Cobranças Pagas
            </ChargeDetails>

            <ChargeDetails
              type='planned'
              listChargesData={listChargesPredicted}
            >
              Cobranças Previstas
            </ChargeDetails>

            <ChargeDetails
              type='expired'
              listChargesData={listChargesExpired}
            >
              Cobranças Vencidas
            </ChargeDetails>

          </div>

          <div className='container-clients-card-resume'>
            <ClientsCardResume
              clientDataType='overdue'
            />
            <ClientsCardResume
              clientDataType='predicted'
            />
          </div>

        </div>
      </div>
      {
        showUserModal &&
        <ModalEditUser
          setShowUserModal={setShowUserModal}
        />
      }
      {isLoading && <LoadingModal />}
    </>
  )
};

export default Home