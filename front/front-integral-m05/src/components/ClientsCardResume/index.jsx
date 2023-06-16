import './styles.css'
import { useState, useEffect } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { getItem } from '../../utils/localStorage'
import OverdueClientIcon from '../../assets/overdue-icon-home-page.png'
import PredictedClientIcon from '../../assets/predicted-icon-home-page.png'
import ClientTableLinesHome from '../ClientTableLinesHome'

import usePageMode from '../../hooks/usePageMode'
import api from '../../services/api'

function ClientsCardResume({ clientDataType }) {
  const [clientsResumeDataPredicted, setClientsResumeDataPredicted] = useState([])
  const [clientsResumeDataOverdue, setClientsResumeDataOverdue] = useState([])
  const { listClientWithChargesExpired, listClientWithChargesPayed } = usePageMode()

  const cardMode = clientDataType
  const navigate = useNavigate()

  let iconImage = undefined
  let titleCard = undefined
  let backgroundColor = undefined
  let numberInfoColor = undefined

  const handleClick = (filter) => {
    navigate({
      pathname: '/clients',
      search: `?${createSearchParams({ status: filter })}`
    })
  }

  if (cardMode === 'overdue') {
    iconImage = OverdueClientIcon
    titleCard = 'Clientes Inadimplentes'
    backgroundColor = '#FFEFEF'
    numberInfoColor = '#971D1D'
  }

  if (cardMode === 'predicted') {
    iconImage = PredictedClientIcon
    titleCard = 'Clientes em Dia'
    backgroundColor = '#EEF6F6'
    numberInfoColor = '#1FA7AF'
  }


  return (
    <div className="clients-card-resume">
      <div className="clients-table-type">
        <div className="card-icon-and-title">
          <img
            className='card-image-icon'
            src={iconImage}
            alt="Icone do Card de Clientes" />
          <h2 className="card-type-title">
            {titleCard}
          </h2>
        </div>

        <div
          className="info-total-data"
          style={{ backgroundColor: `${backgroundColor}` }}
        >
          <h3
            className="info-data-total"
            style={{ color: `${numberInfoColor}` }}
          >
            {clientDataType === 'predicted' &&
              (listClientWithChargesPayed.length).toString().padStart(2, '0')
            }
            {clientDataType === 'overdue' &&
              (listClientWithChargesExpired.length).toString().padStart(2, '0')
            }
          </h3>
        </div>
      </div>

      <table className='client-type-table'>
        <thead>
          <tr className='table-clients-resume-titles'>
            <th
              className='
            table-clients-resume-column-title 
            line-start'>
              Clientes </th>
            <th
              className='
            table-clients-resume-column-title
            line-center'>
              ID do clie. </th>
            <th
              className='
            table-clients-resume-column-title 
            line-end 
            title-moviment'>
              CPF </th>
          </tr>
        </thead>
        <tbody className="lines-space-clients-resume-table">
          {
            clientDataType === 'predicted' &&
            listClientWithChargesPayed.slice(0).reverse().slice(0, 4).map((client) =>
              <ClientTableLinesHome
                key={client.id}
                clientName={client.nome}
                clientId={client.id}
                clientCpf={client.cpf}
              />
            )
          }
          {
            clientDataType === 'overdue' &&
            listClientWithChargesExpired.slice(0).reverse().slice(0, 4).map((client) =>
              <ClientTableLinesHome
                key={client.id}
                clientName={client.nome}
                clientId={client.id}
                clientCpf={client.cpf}
              />
            )
          }

        </tbody>
      </table>
      <div className="see-all-space">
        <h5
          onClick={() => handleClick(clientDataType)}
          className="see-all-option">
          Ver Todos
        </h5>
      </div>
    </div>

  )
};

export default ClientsCardResume;