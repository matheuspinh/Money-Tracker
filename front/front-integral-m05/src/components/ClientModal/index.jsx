import './styles.css'
import MaskedInput from '../../components/MaskedInput'
import Input from '../Input'
import Button from '../Button'
import { useEffect, useState } from 'react'
import CloseIcon from '../../assets/close-img.svg'
import ClientIcon from '../../assets/client-icon-tools-bar-unselected.png'
import api from '../../services/api'
import { isValidCPF } from '@brazilian-utils/brazilian-utils'
import { getItem } from '../../utils/localStorage'
import usePageMode from '../../hooks/usePageMode'



export default function ClientModal({ setEditClientData, setShowNewClientModal, handleOpenFeedback, editMode, editClientData }) {
  const [disabled, setDisabled] = useState(false)
  const { clientsList, setClientsList } = usePageMode()
  const [responseError, setResponseError] = useState('')
  const [client, setClient] = useState({
    name: '',
    email: '',
    cpf: '',
    phoneNumber: '',
    zipCode: '',
    publicPlace: '',
    neighborhood: '',
    addressComplement: '',
    city: '',
    federalState: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    cpf: '',
    phoneNumber: ''
  })

  const token = getItem('token')

  const handleMaskedOnChange = ({ target }) => {
    const treated = (target.value).replace(/\D/g, '')
    setClient({ ...client, [target.name]: treated })
  }

  const handleOnChange = ({ target }) => {
    setClient({ ...client, [target.name]: target.value })
  }

  const handleCloseModal = (e) => {
    e.preventDefault()

    setShowNewClientModal(false)
    return
  }

  const handleCepBlur = async (e) => {
    e.preventDefault()
    if (!client.zipCode || (client.zipCode).length < 8) {
      return
    }
    try {

      const response = await fetch(`https://viacep.com.br/ws/${client.zipCode}/json/`);
      const addressData = await response.json();

      setClient({
        ...client,
        publicPlace: addressData.logradouro,
        neighborhood: addressData.bairro,
        city: addressData.localidade,
        federalState: addressData.uf,
      })

      return
    } catch (err) {
      return err
    } finally {
      setDisabled(false)
    }
  }

  const validateMandatoryInputs = (field) => {
    if (!client[field] || client[field] === null) {
      const updateErrorField = (latestState) => {
        return {
          ...latestState,
          [field]: 'O campo deve ser preenchido',
        };
      }
      setErrors(updateErrorField)
      return (false)
    }
    if (field === 'phoneNumber') {
      if (clientsList.find(clientInList => clientInList.telefone === client.phoneNumber)) {
        if (editMode && clientsList.find(clientInList => clientInList.telefone === client.phoneNumber && clientInList.id === editClientData.id)) {
          const updateErrorField = (latestSate) => {
            return {
              ...latestSate,
              [field]: ''
            }
          }
          setErrors(updateErrorField)
          return (true)
        }
        const updateErrorField = (latestState) => {
          return {
            ...latestState,
            [field]: 'Já existe um cliente com essa informação.',
          };
        }
        setErrors(updateErrorField)
        return (false)
      }
    }
    if (clientsList.find(clientInList => clientInList[field] === client[field])) {
      if (field !== 'name') {
        if (editMode && clientsList.find(clientInList => clientInList[field] === client[field] && clientInList.id === editClientData.id)) {
          const updateErrorField = (latestSate) => {
            return {
              ...latestSate,
              [field]: ''
            }
          }
          setErrors(updateErrorField)
          return (true)
        }
        const updateErrorField = (latestState) => {
          return {
            ...latestState,
            [field]: 'Já existe um cliente com essa informação.',
          };
        }
        setErrors(updateErrorField)
        return (false)
      }
    }
    if (field === 'cpf') {
      if (!isValidCPF(client.cpf)) {
        const updateErrorField = (latestState) => {
          return {
            ...latestState,
            [field]: 'CPF Inválido',
          };
        }
        setErrors(updateErrorField)
        return (false)
      }
    }
    if (field === 'email') {
      const emailSecondPart = client.email.split('@')[1]
      if (!emailSecondPart.includes('.')) {
        setErrors({
          [field]: 'Preencha o campo de e-mail de maneira adequada.'
        });
        return (false)
      }
    }
    const updateErrorField = (latestSate) => {
      return {
        ...latestSate,
        [field]: ''
      }
    }
    setErrors(updateErrorField)
    return (true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setResponseError()
    let localClientList = []
    if (clientsList) {
      localClientList = [...clientsList]
    }

    validateMandatoryInputs('phoneNumber')
    validateMandatoryInputs('name')
    validateMandatoryInputs('email')
    validateMandatoryInputs('cpf')
    if (
      !validateMandatoryInputs('phoneNumber') ||
      !validateMandatoryInputs('name') ||
      !validateMandatoryInputs('email') ||
      !validateMandatoryInputs('cpf')) {
      return;
    }

    if (errors.phoneNumber !== '' || errors.name !== '' || errors.email !== '' || errors.cpf !== '') {
      return
    }

    const requestObject = {
      nome: client.name,
      email: client.email,
      cpf: client.cpf,
      telefone: client.phoneNumber,
      cep: client.zipCode || '',
      endereco: client.publicPlace || '',
      bairro: client.neighborhood || '',
      complemento: client.addressComplement || '',
      cidade: client.city || '',
      uf: client.federalState || ''
    }
    if (!editMode) {
      try {
        const response = await api.post('/cliente',
          requestObject,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        localClientList.push({
          ...response.data,
          emDia: true
        })
        setClientsList(localClientList)
        handleOpenFeedback()

        handleCloseModal(e)
        return
      } catch (err) {
        setResponseError(err.response.data.mensagem)
        return
      }
    } else if (editMode) {
      try {
        const response = await api.put('/cliente',
          {
            ...requestObject,
            id: editClientData.id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        const index = localClientList.findIndex(localClient => localClient.id == editClientData.id)
        localClientList[index] = {
          id: editClientData.id,
          nome: client.name,
          email: client.email,
          cpf: client.cpf,
          telefone: client.phoneNumber,
          cep: client.zipCode,
          endereco: client.publicPlace,
          bairro: client.neighborhood,
          complemento: client.addressComplement,
          cidade: client.city,
          uf: client.federalState
        }
        setClientsList(localClientList)
        setEditClientData({ ...client })
        handleOpenFeedback()
        handleCloseModal(e)

      } catch (err) {
        console.log(err)
        return
      }
    }
  }

  useEffect(() => {
    if (!editMode) {
      setDisabled(true)
    }
    if (editMode === true) {
      setClient({
        id: editClientData.id,
        name: editClientData.name || '',
        email: editClientData.email || '',
        cpf: editClientData.cpf || '',
        phoneNumber: editClientData.phoneNumber || '',
        zipCode: editClientData.zipCode || '',
        publicPlace: editClientData.publicPlace || '',
        neighborhood: editClientData.neighborhood || '',
        addressComplement: editClientData.addressComplement || '',
        city: editClientData.city || '',
        federalState: editClientData.federalState || ''
      })

    }

  }, [])

  return (
    <div className="modal-container">
      <div className="add-new-client-modal">
        <img
          onClick={(e) => handleCloseModal(e)}
          className="close-icon"
          src={CloseIcon}
        />
        <div className="modal-title-box">
          <img src={ClientIcon} />
          <h1>
            {editMode ? "Editar Cliente" : "Cadastro do Cliente"}
          </h1>
        </div>
        <form className="new-client-form">
          <Input
            placeholder='Digite o nome'
            className={errors.name && 'invalid'}
            children="Nome*"
            onChange={handleOnChange}
            name="name"
            value={client.name || ''}
          />
          <p
            className="error-message"
          >
            {errors.name}
          </p>
          <Input
            placeholder='Digite o e-mail'
            className={errors.email && 'invalid'}
            children="E-mail*"
            onChange={handleOnChange}
            name="email"
            value={client.email || ''}
          />
          <p
            className="error-message"
          >
            {errors.email}
          </p>
          <div className="dual-field-box">
            <div>
              <MaskedInput
                placeholder='Digite o CPF'
                mask="999.999.999-99"
                className={errors.cpf && 'invalid'}
                children="CPF*"
                onChange={handleMaskedOnChange}
                name="cpf"
                value={client.cpf || ''}
              />
              <p
                className="error-message"
              >
                {errors.cpf}
              </p>
            </div>
            <div>
              <MaskedInput
                placeholder='Digite o Telefone'
                mask="(99) 99999-9999"
                className={errors.phoneNumber && 'invalid'}
                children="Telefone*"
                onChange={handleMaskedOnChange}
                name="phoneNumber"
                value={client.phoneNumber || ''}
              />
              <p
                className="error-message"
              >
                {errors.phoneNumber}
              </p>
            </div>
          </div>
          <p
            className="error-message"
          >
            {responseError}
          </p>
          <Input
            disabled={disabled}
            placeholder='Digite o endereço'
            children="Endereço"
            onChange={handleOnChange}
            name="publicPlace"
            value={client.publicPlace || ''}
          />
          <Input
            disabled={disabled}
            placeholder='Digite o complemento'
            children="Complemento"
            onChange={handleOnChange}
            name="addressComplement"
            value={client.addressComplement || ''}
          />
          <div className="dual-field-box">
            <div onBlur={handleCepBlur}>
              <MaskedInput
                placeholder='Digite o CEP'
                mask="99999-999"
                children="CEP"
                onChange={handleMaskedOnChange}
                name="zipCode"
                value={client.zipCode || ''}
              />
            </div>
            <Input
              disabled={disabled}
              placeholder='Digite o bairro'
              children="Bairro"
              onChange={handleOnChange}
              name="neighborhood"
              value={client.neighborhood || ''}
            />
          </div>
          <div className="dual-field-box">
            <Input
              disabled={disabled}
              placeholder='Digite a cidade'
              children="Cidade"
              onChange={handleOnChange}
              name="city"
              value={client.city || ''}
            />
            <Input
              disabled={disabled}
              placeholder='Digite a UF'
              children="UF"
              onChange={handleOnChange}
              name="federalState"
              value={client.federalState || ''}
            />
          </div>
        </form>

        <div className="button-box">
          <div
            onClick={(e) => handleCloseModal(e)}
            className="cancel-button"
          >
            <Button width={231}>
              Cancelar
            </Button>
          </div>
          <div
            onClick={(e) => handleSubmit(e)}
          >
            <Button width={231}>
              Aplicar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}