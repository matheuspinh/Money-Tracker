import { useNavigate } from 'react-router-dom'
import ClientsSelected from '../../assets/client-icon-tools-bar-selected.png'
import ClientsUnselected from '../../assets/client-icon-tools-bar-unselected.png'
import HomeSelected from '../../assets/home-icon-tools-bar-selected.png'
import HomeUnselected from '../../assets/home-icon-tools-bar-unselected.png'
import ChargeSelected from '../../assets/paper-sheet-icon-tools-bar-selected.png'
import ChargeUnselected from '../../assets/paper-sheet-icon-tools-bar-unselected.png'
import './styles.css'

function ToolsBar({ pageMode }) {
  const navigateTo = useNavigate()
  return (
    <div className="tools-bar">
      <div className="tools-bar-options">
        <div
          style={{
            borderRight: `${pageMode === 'home' ? '3px solid #DA0175' : 'none'}`,
            borderLeft: `${pageMode === 'home' ? '3px solid transparent' : 'none'}`
          }}
          className="option-tools-bar"
          id="home"
          onClick={() => navigateTo('/home')}
        >
          <img
            src={pageMode === 'home' ? HomeSelected : HomeUnselected}
            alt="Icone da página Home"
            id="home"
            className="option-icon"
          />
          <h2
            style={{ color: `${pageMode === 'home' ? '#DA0175' : '#343447'}` }}
            id='home'
            className="option-name"
          >
            Home
          </h2>
        </div>
        <div
          style={{
            borderRight: `${pageMode === 'clients' ? '3px solid #DA0175' : 'none'}`,
            borderLeft: `${pageMode === 'clients' ? '3px solid transparent' : 'none'}`
          }}
          className="option-tools-bar"
          id="clients"
          onClick={() => navigateTo('/clients')}
        >
          <img
            src={pageMode === 'clients' ? ClientsSelected : ClientsUnselected}
            alt="Icone da página de Clientes"
            id="clients"
            className="option-icon"
          />
          <h2
            style={{ color: `${pageMode === 'clients' ? '#DA0175' : '#343447'}` }}
            id='clients'
            className="option-name"
          >
            Clientes
          </h2>
        </div>
        <div
          style={{
            borderRight: `${pageMode === 'charges' ? '3px solid #DA0175' : 'none'}`,
            borderLeft: `${pageMode === 'charges' ? '3px solid transparent' : 'none'}`
          }}
          className="option-tools-bar"
          id="charge"
          onClick={() => navigateTo('/charges')}
        >
          <img
            src={pageMode === 'charges' ? ChargeSelected : ChargeUnselected}
            alt="Icone da página de Cobranças"
            id="charge"
            className="option-icon"
          />
          <h2
            style={{ color: `${pageMode === 'charges' ? '#DA0175' : '#343447'}` }}
            id='charge'
            className="option-name"
          >
            Cobranças
          </h2>
        </div>
      </div>
    </div>
  )
};

export default ToolsBar