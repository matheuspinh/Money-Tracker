import './styles.css'
import PaidIcon from '../../assets/paid-charge.png'
import OverdueIcon from '../../assets/overdue-charge.png'
import PredictedIcon from '../../assets/predicted-charge.png'

export default function ChargesSummary({ chargeSummaryData }) {
  const type = chargeSummaryData.type
  const titleText = type === 'paid' && 'Pagas' || type === 'predicted' && 'Previstas' || type === 'overdue' && 'Vencidas'
  const icon = type === 'paid' && PaidIcon || type === 'predicted' && PredictedIcon || type === 'overdue' && OverdueIcon
  const formattedAmount = ((chargeSummaryData.amount / 100).toFixed(2).replace('.', ',')).toLocaleString('pt-BR')

  return (
    <div className={`summary-container ${chargeSummaryData.type}`}>
      <img src={icon}></img>
      <div className="summary-text-container">
        <h2>Cobranças {titleText}</h2>
        <h1>R$ {formattedAmount}</h1>
      </div>
    </div>
  )
}