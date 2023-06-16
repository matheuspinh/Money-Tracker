import './styles.css';
import EditCharge from '../../assets/edit-icon-header-user.png'
import DeleteCharge from '../../assets/delete-icon.svg'
import usePageMode from '../../hooks/usePageMode'


function SingleClientChargeLines({ idCharge, chargeValue, chargeDeadline, chargeDesciption, chargePaidOut }) {
  const {
    setShowModalEditCharge,
    setDataModalEditCharge,
    dataModalEditCharge,
    setShowModalChargesDetails,
    setDataModalChargeDetails,
    setShowModalDeleteCharge,
    setDataModalDeleteCharge } = usePageMode()

  const chargeDescriptionFormated = (chargeDesciption.length > 30
    ? chargeDesciption.slice(0, 35).trim() + '...'
    : chargeDesciption)

  function handleDeleteCharge() {
    setDataModalDeleteCharge({ idCharge, chargeDeadline, chargePaidOut })
    setShowModalDeleteCharge(true)
  }

  function handleEditCharge() {
    setDataModalEditCharge({
      ...dataModalEditCharge,
      idCharge,
      value: chargeValue,
      expiration: chargeDeadline.split('T')[0],
      description: chargeDesciption,
      typeCharge: chargePaidOut
    })

    setShowModalEditCharge(true)
  }

  const handleOpenModalChargeDetails = () => {
    setDataModalChargeDetails({
      ...dataModalEditCharge,
      idCharge,
      value: chargeValue,
      expiration: chargeDeadline,
      description: chargeDesciption,
      typeCharge: chargePaidOut
    })

    setShowModalChargesDetails(true)
  }


  const dateISOFormatted = (date) => date.toISOString().split('T')[0]
  const atualDate = dateISOFormatted(new Date())

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

  const date = new Date(chargeDeadline).toLocaleString('pt-br', { timeZone: 'UTC' })
  const formattedDate = date.split(',')[0];

  return (
    <tr className='charges-table-lines-grouping'>
      <td
        className='charges-table-line line-start id-charge'
        onClick={handleOpenModalChargeDetails}
      >
        {idCharge}</td>
      <td className='charges-table-line'>
        {formattedDate}
      </td>
      <td className='charges-table-line'>
        R$ {(chargeValue / 100).toFixed(2).replace('.', ',')}
      </td>
      <td className='charges-table-line'>
        {
          chargeStatus === 'pending' &&
          <div className="pending-status-charge line-status-default">
            <h3
              style={{ color: '#C5A605' }}
              className="status-text">
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
      <td className='charges-table-line exception-rule-more'>
        {chargeDescriptionFormated}
      </td>
      <td className='charges-table-line exception-rule-minus gap-area-line-icons'>
        <button
          onClick={() => handleEditCharge()}
          className='button-charge-line'
        >
          <img src={EditCharge} alt="Botão Editar Cobrança" />
          <h3>Editar</h3>
        </button>
        <button
          onClick={handleDeleteCharge}
          className='button-charge-line'
        >
          <img src={DeleteCharge} alt="Botão Excluir Cobrança" />
          <h3 className='text-red'>Excluir</h3>
        </button>
      </td>
    </tr>
  )
};

export default SingleClientChargeLines;