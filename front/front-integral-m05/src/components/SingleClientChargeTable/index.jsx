import './styles.css';
import OrderByIcon from '../../assets/order-by-icon-clients.png'
import Button from '../Button'
import SingleClientChargeLines from '../SingleClientChargeLines'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getItem } from '../../utils/localStorage'
import usePageMode from '../../hooks/usePageMode'




function SingleClientChargeTable({ idClient }) {
  const {
    chargeUniqueClient,
    setChargeUniqueClient,
    showRegisterChargeModal,
    setShowRegisterChargeModal,
    clientsList,
    setUserChargeDataToBeRegistered } = usePageMode()
  const navigate = useNavigate()
  const token = getItem('token')



  async function getChargesSingleClient() {
    try {
      const response = await api.get(`/cobranca/?cliente_id=${idClient}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setChargeUniqueClient(response.data)

    } catch (error) {
      navigate('/clients')
    }
  }

  const handleOpenModalChargeRegister = () => {
    const clientSelected = clientsList.find((client) => client.id === Number(idClient))

    setUserChargeDataToBeRegistered({
      name: clientSelected.nome,
      clientId: clientSelected.id
    })

    setShowRegisterChargeModal(true);
  }

  useEffect(() => {
    getChargesSingleClient()

  }, [showRegisterChargeModal])

  return (
    <div className="single-client-charge-table-area">
      <div className="single-client-table-title">
        <h2 className="single-client-charges-title">
          Cobranças do Cliente
        </h2>
        <Button
          width={252}
          type='button'
          handleButton={handleOpenModalChargeRegister}
        >
          + Nova Cobrança
        </Button>
      </div>
      <table className='single-client-charge-table'>
        <thead>
          <tr className='single-client-charge-table-title'>
            <th className='single-client-charge-table-column line-start'>
              <img
                src={OrderByIcon}
                alt="Icone de Filtro para Clientes"
              />
              ID Cob.
            </th>
            <th
              className='single-client-charge-table-column'>
              <img
                src={OrderByIcon}
                alt="Icone de Filtro para Clientes"
              />
              Data de Venc.
            </th>
            <th
              className='single-client-charge-table-column'
            >
              Valor
            </th>
            <th
              className='single-client-charge-table-column'
            >
              Status
            </th>
            <th
              className='single-client-charge-table-column exception-rule-more'
            >
              Descrição
            </th>
            <th
              className='single-client-charge-table-column exception-rule-minus'
            >

            </th>
          </tr>
        </thead>
        <tbody>
          {
            chargeUniqueClient &&
            chargeUniqueClient.slice(0).reverse().map((charge) =>
              <SingleClientChargeLines
                key={charge.id}
                idCharge={charge.id}
                chargeDeadline={charge.vencimento}
                chargeValue={charge.valor}
                chargePaidOut={charge.pago}
                chargeDesciption={charge.descricao}
              />
            )
          }
        </tbody>

      </table>
    </div>
  )
};

export default SingleClientChargeTable