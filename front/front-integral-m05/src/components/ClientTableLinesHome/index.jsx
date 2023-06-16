import './styles.css';
import { useNavigate } from 'react-router-dom'

function ClientTableLinesHome({ clientName, clientId, clientCpf }) {
  const navigate = useNavigate()
  function handleViewSingleClient() {
    navigate(`/clients/${clientId}`)
  }

  const formattedDocument =
    clientCpf.slice(0, 3) + '.'
    + clientCpf.slice(3, 6) + '.'
    + clientCpf.slice(6, 9) + '-'
    + clientCpf.slice(9, 11)

  return (
    <tr className='table-clients-lines'>
      <td
        onClick={() => handleViewSingleClient()}
        className='table-clients-line line-start'>
        {clientName}
      </td>
      <td
        className='table-clients-line line-center'>
        {clientId}
      </td>
      <td
        className='table-clients-line line-end'>
        {formattedDocument}
      </td>
    </tr>
  )
};

export default ClientTableLinesHome;