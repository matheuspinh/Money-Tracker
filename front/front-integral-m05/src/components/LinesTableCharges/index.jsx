import './styles.css';
import { format } from 'date-fns'
import EditCharge from '../../assets/edit-icon-header-user.png'
import DeleteCharge from '../../assets/delete-icon.svg'
import usePageMode from '../../hooks/usePageMode'

function LinesTableCharges({ chargeId, clientName, idCharge, chargeValue, chargeDeadline, chargeDesciption, chargePaidOut }) {
  const { setShowModalEditCharge, setDataModalEditCharge, setShowModalChargesDetails, setDataModalChargeDetails, setShowModalDeleteCharge, setDataModalDeleteCharge } = usePageMode()

  const date = new Date(chargeDeadline).toLocaleString('pt-br', { timeZone: 'UTC' })

  const formattedDate = date.split(',')[0]

  const chargeDescriptionFormated = (chargeDesciption.length > 30
    ? chargeDesciption.slice(0, 30).trim() + '...'
    : chargeDesciption)

  const IdCharge = chargeId

  function handleDeleteCharge() {
    setDataModalDeleteCharge({ idCharge, chargeDeadline, chargePaidOut })
    setShowModalDeleteCharge(true)
  }

  function handleEditCharge() {
    setDataModalEditCharge({
      idCharge,
      name: clientName,
      value: chargeValue,
      expiration: chargeDeadline.split("T")[0],
      description: chargeDesciption,
      typeCharge: chargePaidOut
    })
    setShowModalEditCharge(true)
  }

  function handleShowModalChargeDetails() {
    setDataModalChargeDetails({
      idCharge,
      name: clientName,
      value: chargeValue,
      expiration: chargeDeadline,
      description: chargeDesciption,
      typeCharge: chargePaidOut
    })
    setShowModalChargesDetails(true)
  }

  const dateISOFormatted = (date) => date.toISOString().split('T')[0]
  const atualDate = dateISOFormatted(new Date());

  let chargeStatus

  const chargeDeadlineDate = dateISOFormatted(new Date(chargeDeadline))

  if (chargeDeadlineDate >= atualDate) {
    chargeStatus = 'pending'
  }

  if (chargeDeadlineDate < atualDate) {
    chargeStatus = 'overdue'
  }

  if (chargePaidOut) {
    chargeStatus = 'paid'
  }

  return (
    <tr className='charges-table-lines-grouping'>
      <td
        style={{ width: '16%' }}
        className='charges-table-line line-start'
      >
        {clientName}
      </td>
      <td
        style={{ width: '12%' }}
        className='charges-table-line id-charge'
        onClick={handleShowModalChargeDetails}
      >
        {idCharge}
      </td>
      <td
        style={{ width: '12%' }}
        className='charges-table-line'
      >
        R$ {(chargeValue / 100).toFixed(2).replace('.', ',')}
      </td>
      <td
        style={{ width: '12%' }}
        className='charges-table-line'
      >
        {formattedDate}
      </td>
      <td
        style={{ width: '12%' }}
        className='charges-table-line exception-rule-minus'
      >
        {
          chargeStatus === 'pending' &&
          <div className="pending-status-charge line-status-default">
            <h3
              style={{ color: '#C5A605' }}
              className="status-text"
            >
              Pendente
            </h3>
          </div>
        }
        {
          chargeStatus === 'overdue' &&
          <div className="overdue-status-charge line-status-default">
            <h3
              style={{ color: '#971D1D' }}
              className="status-text"
            >
              Vencida
            </h3>
          </div>
        }
        {
          chargeStatus === 'paid' &&
          <div className="paid-status-charge line-status-default">
            <h3
              style={{ color: '#1FA7AF' }}
              className="status-text"
            >
              Paga
            </h3>
          </div>
        }
      </td>
      <td
        style={{ width: '26%' }}
        className='charges-table-line exception-rule-more description-column'
      >
        {chargeDescriptionFormated}
      </td>
      <td
        style={{ width: '10%' }}
        className='charges-table-line exception-rule gap-area-line-icons'
      >
        <button
          onClick={() => handleEditCharge()}
          id='button-charge-line'>
          <img src={EditCharge} alt="Botão Editar Cobrança"
          />
          <h3>Editar</h3>
        </button>
        <button
          onClick={() => handleDeleteCharge()}
          id='button-charge-line'>
          <img src={DeleteCharge} alt="Botão Excluir Cobrança"
          />
          <h3 className='text-red'>Excluir</h3>
        </button>
      </td>
    </tr>
  )
};

export default LinesTableCharges;