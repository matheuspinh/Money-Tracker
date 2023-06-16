import { useState, useEffect } from 'react';
import OrderByIcon from '../../assets/order-by-icon-clients.png';
import LinesTableClients from '../LinesTableClients';
import './styles.css';
import NoResults from '../../components/NoResults'

function ClientsTable({ clientsList, searchMode, atualPage, setAtualPage }) {
  const [orderMode, setOrderMode] = useState(false)
  const [orderDirection, setOrderDirection] = useState(false)
  const [itensPerPage, setItensPerPage] = useState(10)

  let clientsToRender = clientsList && [...clientsList] || [];

  const clientListPages = Math.ceil(clientsToRender.length / itensPerPage);
  const startIndex = (atualPage - 1) * itensPerPage;
  const endIndex = startIndex + itensPerPage;

  function handleChangeOrderMode() {
    setOrderMode(true)
    setOrderDirection(!orderDirection)
  }

  return (
    <>
      <div className="clients-table-area">
        <table className='clients-table'>
          <thead>
            <tr className='clients-table-title'>
              <th
                onClick={() => handleChangeOrderMode()}
                className='clients-table-column line-start'>
                <img
                  src={OrderByIcon}
                  alt="Icone de Filtro para Clientes"
                />
                Cliente
              </th>
              <th className='clients-table-column'>CPF</th>
              <th className='clients-table-column'>E-mail</th>
              <th className='clients-table-column'>Telefone</th>
              <th className='clients-table-column'>Status</th>
              <th className='clients-table-column'>Criar Cobrança</th>
            </tr>
          </thead>
          <tbody>
            {!orderMode &&
              clientsList && clientsToRender.slice(0).reverse().slice(startIndex, endIndex).map((client) =>
                <LinesTableClients
                  key={client.id}
                  clientId={client.id}
                  clientName={client.nome}
                  clientDocument={client.cpf}
                  clientEmail={client.email}
                  clientPhoneNumber={client.telefone}
                  clientStatus={client.emDia}
                />
              )
            }
            {
              orderMode && orderDirection &&
              clientsToRender.sort((first, second) => first.nome.localeCompare(second.nome)).slice(startIndex, endIndex).map((client) =>
                <LinesTableClients
                  key={client.id}
                  clientId={client.id}
                  clientName={client.nome}
                  clientDocument={client.cpf}
                  clientEmail={client.email}
                  clientPhoneNumber={client.telefone}
                  clientStatus={client.emDia}
                />
              )
            }
            {
              orderMode && !orderDirection &&
              clientsToRender.sort((first, second) => second.nome.localeCompare(first.nome)).slice(startIndex, endIndex).map((client) =>
                <LinesTableClients
                  key={client.id}
                  clientId={client.id}
                  clientName={client.nome}
                  clientDocument={client.cpf}
                  clientEmail={client.email}
                  clientPhoneNumber={client.telefone}
                  clientStatus={client.emDia}
                />
              )
            }
            {
              searchMode && clientsList.length <= 0 &&
              <NoResults />
            }
          </tbody>

        </table>
      </div>
      <div className='pagination'>
        {Array.from(Array(clientListPages), (item, index) => {
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

export default ClientsTable;