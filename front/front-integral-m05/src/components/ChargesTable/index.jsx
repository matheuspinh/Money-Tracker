import { useEffect, useState } from 'react';
import OrderByIcon from '../../assets/order-by-icon-clients.png';
import NoResults from '../../components/NoResults';
import LinesTableCharges from '../LinesTableCharges';
import './styles.css';



function ChargesTable({ chargesList, searchMode, atualPage, setAtualPage }) {
  const localChargeList = [...chargesList]

  const [orderMode, setOrderMode] = useState('')
  const [orderByClientName, setOrderByClientName] = useState(false)
  const [orderByChargeId, setOrderByChargeId] = useState(false)
  const [itensPerPage, setItensPerPage] = useState(10)

  const localChargeListPages = Math.ceil(localChargeList.length / itensPerPage);
  const startIndex = (atualPage - 1) * itensPerPage;
  const endIndex = startIndex + itensPerPage

  function handleOrderByClientName() {
    setOrderMode('byClientsName')
    setOrderByClientName(!orderByClientName)
    setOrderByChargeId(false)
    setAtualPage(1)
  }

  function handleOrderByChargeId() {
    setOrderMode('byChargesId')
    setOrderByChargeId(!orderByChargeId)
    setOrderByClientName(false)
    setAtualPage(1)
  }

  const descClientName = [...chargesList].sort((first, second) => first.nome.localeCompare(second.nome))
  const ascClientName = [...chargesList].sort((first, second) => second.nome.localeCompare(first.nome))
  const descChargeId = [...chargesList].sort((first, second) => String(first.id).localeCompare(String(second.id)))
  const ascChargeId = [...chargesList].sort((first, second) => String(second.id).localeCompare(String(first.id)))

  useEffect(() => {
  }, [atualPage])

  return (
    <>
      <div className="charges-table-area">
        <table className='charges-table'>
          <thead>
            <tr className='charges-table-title'>
              <th
                onClick={() => handleOrderByClientName()}
                style={{ width: '16%' }}
                className='charges-table-column line-start column-filter'>
                <img
                  src={OrderByIcon}
                  alt="Icone de Filtro para Clientes"
                />
                Cliente
              </th>
              <th
                onClick={() => handleOrderByChargeId()}
                style={{ width: '12%' }}
                className='charges-table-column column-filter'>
                <img
                  src={OrderByIcon}
                  alt="Icone de Filtro para Clientes"
                />
                ID Cob.
              </th>
              <th
                style={{ width: '12%' }}
                className='charges-table-column'>Valor</th>
              <th
                style={{ width: '12%' }}
                className='charges-table-column'>Data de Venc.</th>
              <th
                style={{ width: '12%' }}
                className='charges-table-column'>Status</th>
              <th
                style={{ width: '26%' }}
                className='charges-table-column'>Descrição</th>
              <th
                style={{ width: '10%' }}
                className='charges-table-column'></th>
            </tr>
          </thead>
          <tbody>
            {!orderMode && chargesList && localChargeList.slice(0).reverse().slice(startIndex, endIndex).map((charge) =>
              <LinesTableCharges
                key={charge.id}
                clientName={charge.nome}
                idCharge={charge.id}
                chargeValue={charge.valor}
                chargeDeadline={charge.vencimento}
                chargeDesciption={charge.descricao}
                chargePaidOut={charge.pago}
              />)}
            {
              orderMode === 'byClientsName' && chargesList && orderByClientName &&
              descClientName.slice(startIndex, endIndex).map((charge) =>
                <LinesTableCharges
                  key={charge.id}
                  clientName={charge.nome}
                  idCharge={charge.id}
                  chargeValue={charge.valor}
                  chargeDeadline={charge.vencimento}
                  chargeDesciption={charge.descricao}
                  chargePaidOut={charge.pago}
                />)
            }
            {
              orderMode === 'byClientsName' && chargesList && !orderByClientName &&
              ascClientName.slice(startIndex, endIndex).map((charge) =>
                <LinesTableCharges
                  key={charge.id}
                  clientName={charge.nome}
                  idCharge={charge.id}
                  chargeValue={charge.valor}
                  chargeDeadline={charge.vencimento}
                  chargeDesciption={charge.descricao}
                  chargePaidOut={charge.pago}
                />)
            }
            {
              orderMode === 'byChargesId' && chargesList && orderByChargeId &&
              descChargeId.slice(startIndex, endIndex).map((charge) =>
                <LinesTableCharges
                  key={charge.id}
                  clientName={charge.nome}
                  idCharge={charge.id}
                  chargeValue={charge.valor}
                  chargeDeadline={charge.vencimento}
                  chargeDesciption={charge.descricao}
                  chargePaidOut={charge.pago}
                />)
            }
            {
              orderMode === 'byChargesId' && chargesList && !orderByChargeId &&
              ascChargeId.slice(startIndex, endIndex).map((charge) =>
                <LinesTableCharges
                  key={charge.id}
                  clientName={charge.nome}
                  idCharge={charge.id}
                  chargeValue={charge.valor}
                  chargeDeadline={charge.vencimento}
                  chargeDesciption={charge.descricao}
                  chargePaidOut={charge.pago}
                />)
            }
            {
              searchMode && chargesList.length <= 0 &&
              <NoResults />
            }
          </tbody>

        </table>
      </div>
      <div className='pagination'>
        {!orderMode && Array.from(Array(localChargeListPages), (item, index) => {
          return <button
            style={{
              backgroundColor:
                `${Number(index + 1) === Number(atualPage) ? '#F5A8D0' : '#FFFFFF'}`,
              color: `${Number(index + 1) === Number(atualPage) ? '#FFFFFF' : '#DA0175'}`
            }}
            onClick={(e) => setAtualPage(index + 1)}
            key={Math.random()}
          >{index + 1}</button>
        })}
        {orderMode === 'byClientsName' && orderByClientName &&
          Array.from(Array(localChargeListPages), (item, index) => {
            return <button
              style={{
                backgroundColor:
                  `${Number(index + 1) === Number(atualPage) ? '#F5A8D0' : '#FFFFFF'}`,
                color: `${Number(index + 1) === Number(atualPage) ? '#FFFFFF' : '#DA0175'}`
              }}
              onClick={(e) => setAtualPage(index + 1)}
              key={Math.random()}
            >{index + 1}</button>
          })}
        {orderMode === 'byClientsName' && !orderByClientName &&
          Array.from(Array(localChargeListPages), (item, index) => {
            return <button
              style={{
                backgroundColor:
                  `${Number(index + 1) === Number(atualPage) ? '#F5A8D0' : '#FFFFFF'}`,
                color: `${Number(index + 1) === Number(atualPage) ? '#FFFFFF' : '#DA0175'}`
              }}
              onClick={(e) => setAtualPage(index + 1)}
              key={Math.random()}
            >{index + 1}</button>
          })}
        {orderMode === 'byChargesId' && orderByChargeId &&
          Array.from(Array(localChargeListPages), (item, index) => {
            return <button
              style={{
                backgroundColor:
                  `${Number(index + 1) === Number(atualPage) ? '#F5A8D0' : '#FFFFFF'}`,
                color: `${Number(index + 1) === Number(atualPage) ? '#FFFFFF' : '#DA0175'}`
              }}
              onClick={(e) => setAtualPage(index + 1)}
              key={Math.random()}
            >{index + 1}</button>
          })}
        {orderMode === 'byChargesId' && !orderByChargeId &&
          Array.from(Array(localChargeListPages), (item, index) => {
            return <button
              style={{
                backgroundColor:
                  `${Number(index + 1) === Number(atualPage) ? '#F5A8D0' : '#FFFFFF'}`,
                color: `${Number(index + 1) === Number(atualPage) ? '#FFFFFF' : '#DA0175'}`
              }}
              onClick={(e) => setAtualPage(index + 1)}
              key={Math.random()}
            >{index + 1}</button>
          })}
      </div>
    </>

  )
};

export default ChargesTable;