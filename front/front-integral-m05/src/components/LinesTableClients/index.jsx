import './styles.css'
import { useNavigate } from 'react-router-dom'
import AddNewCharge from '../../assets/add-new-charge-icon.png'
import usePageMode from '../../hooks/usePageMode'

function LinesTableClients({ clientId, clientName, clientDocument, clientEmail, clientPhoneNumber, clientStatus }) {
  const {
    listClientWithChargesExpired,
    setShowRegisterChargeModal,
    setUserChargeDataToBeRegistered } = usePageMode()

  const navigate = useNavigate()

  function openModalNewCharge() {
    setShowRegisterChargeModal(true)
    setUserChargeDataToBeRegistered({
      name: clientName,
      clientId: clientId
    })
  }

  function handleViewSingleClient() {
    setUserChargeDataToBeRegistered({
      name: clientName,
      clientId: clientId
    })
    navigate(`/clients/${clientId}`)
  }

  if (!clientDocument) {
    clientDocument = ''
  };

  if (!clientPhoneNumber) {
    clientPhoneNumber = ''
  };

  const formattedDocument =
    clientDocument.slice(0, 3) + ' '
    + clientDocument.slice(3, 6) + ' '
    + clientDocument.slice(6, 9) + ' '
    + clientDocument.slice(9, 11)

  const formattedPhoneNumber =
    clientPhoneNumber.slice(0, 2) + ' '
    + clientPhoneNumber.slice(2, 3) + ' '
    + clientPhoneNumber.slice(3, 7) + ' '
    + clientPhoneNumber.slice(7, 11)


  return (
    <tr className='clients-table-lines-grouping'>
      <td
        onClick={() => handleViewSingleClient()}
        className='clients-table-line line-start name-line'
      >
        {clientName}
      </td>
      <td className='clients-table-line'>
        {formattedDocument}
      </td>
      <td className='clients-table-line'>
        {clientEmail}
      </td>
      <td className='clients-table-line'>
        {formattedPhoneNumber}
      </td>
      <td className='clients-table-line'>
        {
          clientStatus ?
            <div className="status-no-delays">
              <h3
                style={{ color: '#1FA7AF' }}
                className="client-status-name"
              >
                Em Dia
              </h3>
            </div>
            :
            <div className="status-defaulter">
              <h3
                style={{ color: '#971D1D' }}
                className="client-status-name"
              >
                Inadimplente
              </h3>
            </div>
        }
      </td>
      <td className='clients-table-line'>
        <button className='add-new-charge-button'>
          <img
            onClick={() => openModalNewCharge()}
            className='add-new-charge-image'
            src={AddNewCharge}
            alt="Botão adicionar nova cobrança"
          />
        </button>
      </td>
    </tr>
  )
};

export default LinesTableClients;