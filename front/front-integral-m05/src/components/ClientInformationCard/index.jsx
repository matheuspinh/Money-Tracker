import './styles.css';
import EditClient from '../../assets/edit-client-icon.svg';

function ClientInformationCard({
  client, setShowEditClientModal
}) {

  let formattedCep = ''
  let formattedDocument = ''
  let formattedPhone = ''

  if (client.phoneNumber) {
    formattedPhone =
      client.phoneNumber.slice(0, 2) + ' '
      + client.phoneNumber.slice(2, 3) + ' '
      + client.phoneNumber.slice(3, 7) + ' '
      + client.phoneNumber.slice(7, 11);
  }
  if (client.cpf) {
    formattedDocument =
      client.cpf.slice(0, 3) + ' '
      + client.cpf.slice(3, 6) + ' '
      + client.cpf.slice(6, 9) + ' '
      + client.cpf.slice(9, 11)
  }
  if (client.cep) {
    formattedCep =
      client.cep.slice(0, 5) +
      '-' + client.cep.slice(5, 9)
  }

  return (
    <div className="client-information-card">
      <div className="title-and-button-edit-client">
        <h2 className="client-title-card">
          Dados do cliente
        </h2>
        <button onClick={() => setShowEditClientModal(true)} className="client-edit-button">
          <img
            src={EditClient}
            alt="Icone do botão para editar cliente" />
          <h3>Editar Cliente</h3>
        </button>
      </div>
      <div className="personal-data-single-client">
        <div className="information-single-client-nivel-1">
          <h3 className="title-data-information">
            E-mail
          </h3>
          <h3 className="data-information">
            {client.email}
          </h3>
        </div>
        <div className="information-single-client-nivel-2">
          <h3 className="title-data-information">
            Telefone
          </h3>
          <h3 className="data-information">
            {formattedPhone}
          </h3>
        </div>
        <div className="information-single-client-nivel-3">
          <h3 className="title-data-information">
            CPF
          </h3>
          <h3 className="data-information">
            {formattedDocument}
          </h3>
        </div>
      </div>
      <div className="address-information-single-client">
        <div className="information-single-client-nivel-1">
          <h3 className="title-data-information">
            Endereço
          </h3>
          <h3 className="data-information">
            {client.publicPlace}
          </h3>
        </div>
        <div className="information-single-client-nivel-2">
          <h3 className="title-data-information">
            Bairro
          </h3>
          <h3 className="data-information">
            {client.neighborhood}
          </h3>
        </div>
        <div className="information-single-client-nivel-3">
          <h3 className="title-data-information">
            Complemento
          </h3>
          <h3 className="data-information">
            {client.addressComplement}
          </h3>
        </div>
        <div className="information-single-client-nivel-3">
          <h3 className="title-data-information">
            CEP
          </h3>
          <h3 className="data-information">
            {client.zipCode}
          </h3>
        </div>
        <div className="information-single-client-nivel-3">
          <h3 className="title-data-information">
            Cidade
          </h3>
          <h3 className="data-information">
            {client.city}
          </h3>
        </div>
        <div className="information-single-client">
          <h3 className="title-data-information">
            UF
          </h3>
          <h3 className="data-information">
            {client.federalState}
          </h3>
        </div>
      </div>
    </div>
  )
};

export default ClientInformationCard;