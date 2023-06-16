import './style.css'
import imgClose from '../../assets/close-img.svg'
import imgPage from '../../assets/icon-page.svg'

import Input from '../Input/index'
import InputRadio from '../InputRadio'
import InputTextArea from '../InputTextArea'
import Button from '../Button/index'
import { useState } from 'react'
import usePageMode from '../../hooks/usePageMode'
import CurrencyInput from 'react-currency-input-field';

import api from '../../services/api'
import { getItem } from '../../utils/localStorage'

const errorTypes = {
    description: {
        message: '',
        classType: ''
    },
    expiration: {
        message: '',
        classType: ''
    },
    value: {
        message: '',
        classType: ''
    }
}

function ModalRegisterCharge({ handleOpenSucessRegisterCharge }) {
    const { setShowRegisterChargeModal, userChargeDataToBeRegistered } = usePageMode()
    const { clientsList, setClientsList } = usePageMode();
    const dataRegisterChargeBase = {
        ...userChargeDataToBeRegistered,
        description: '',
        expiration: '',
        value: '',
        paid: true
    }

    const [dataRegisterCharge, setDataRegisterCharge] = useState(dataRegisterChargeBase)
    const [errorMessage, setErrorMessage] = useState(errorTypes)

    const handleOnChange = ({ target }) => {
        setErrorMessage(errorTypes)
        setDataRegisterCharge({ ...dataRegisterCharge, [target.name]: target.value })
    }

    const handleValueChange = (value) => {
        setErrorMessage(errorTypes)

        if (value && !value.includes(',')) {
            let formatted = parseInt(value.replace(',', ''))
            formatted = formatted * 100
            return setDataRegisterCharge({ ...dataRegisterCharge, value: formatted })
        } else if (value && value.includes(',')) {
            const reais = value.split(',')[0]
            const cents = value.split(',')[1].padEnd(2, '0')
            const newValue = reais + cents
            let formatted = parseInt(newValue)
            return setDataRegisterCharge({ ...dataRegisterCharge, value: formatted })
        }
        return setDataRegisterCharge({ ...dataRegisterCharge, value })
    }

    const handleRadioInput = ({ target }) => {
        const value = target.value === 'true' ? true : false
        setDataRegisterCharge({
            ...dataRegisterCharge,
            paid: value
        })
    }

    const handleCloseModal = () => {
        setShowRegisterChargeModal(false)
    }

    const handleCancelRegisterCharge = (event) => {
        event.stopPropagation()
        setDataRegisterCharge(dataRegisterChargeBase)
        handleCloseModal()
    }


    const handleOnSubmit = async (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (!dataRegisterCharge.description) {
            return setErrorMessage({
                ...errorMessage,
                description: {
                    message: 'Este campo deve ser preenchido',
                    classType: 'input-avoid'
                }
            })
        }

        if (!dataRegisterCharge.expiration) {
            return setErrorMessage({
                ...errorMessage,
                expiration: {
                    message: 'Este campo deve ser preenchido',
                    classType: 'input-avoid'
                }
            })
        }

        if (!dataRegisterCharge.value) {
            return setErrorMessage({
                ...errorMessage,
                value: {
                    message: 'Este campo deve ser preenchido',
                    classType: 'input-avoid'
                }
            })
        }

        try {
            const chargeDataToBeSend = {
                cliente_id: dataRegisterCharge.clientId,
                descricao: dataRegisterCharge.description,
                vencimento: dataRegisterCharge.expiration,
                valor: dataRegisterCharge.value,
                pago: dataRegisterCharge.paid
            }


            const token = getItem('token')
            const responseChargeDataSend = await await api.post('/cobranca', chargeDataToBeSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            const localClientsList = [...clientsList]
            const currentClient = localClientsList.filter((client) => client.id === dataRegisterCharge.clientId)

            if (responseChargeDataSend.status === 201) {

                if (currentClient[0].emDia && dataRegisterCharge.paid === false) {

                    if (new Date > new Date(dataRegisterCharge.expiration)) {
                        currentClient[0].emDia = false
                        const index = localClientsList.findIndex(localClient => localClient.id == currentClient.id)
                        localClientsList[index] = currentClient[0]
                        setClientsList([...localClientsList])
                    }
                }
                handleCloseModal()
                handleOpenSucessRegisterCharge()
                return
            }

        } catch (error) {
            return
        }

    }

    return (
        <div className="modal-background-register-charge">

            <div className="modal-content-register-charge">
                <div className='modal-close-button-register-charge'>
                    <img
                        src={imgClose}
                        alt="Botão para sair do formulário de editar cadastro."
                        onClick={handleCloseModal}
                    />
                </div>
                <form onSubmit={handleOnSubmit}>
                    <div className='header-form-register-charge'>
                        <img src={imgPage} />
                        <h2>
                            Cadastro de cobrança
                        </h2>
                    </div>

                    <Input
                        id='client-name-register-charge'
                        name='name'
                        type='text'
                        value={dataRegisterCharge.name}
                        readOnly={'readOnly'}
                    >
                        Nome*
                    </Input>

                    <InputTextArea
                        id='description-register-charge'
                        name='description'
                        type='text'
                        placeholder='Digite a descrição'
                        className={errorMessage.description.classType}
                        value={dataRegisterCharge.description}
                        onChange={handleOnChange}
                    >
                        Descrição*
                    </InputTextArea>
                    <p
                        className='message-error-register-charge'
                    >
                        {errorMessage.description.message}
                    </p>

                    <div
                        className='container-register-charge-input-numbers'>
                        <div>
                            <Input
                                id='expiration-register-charge'
                                name='expiration'
                                type='date'
                                placeholder='Digite o vencimento'
                                className={errorMessage.expiration.classType}
                                value={dataRegisterCharge.expiration}
                                onChange={handleOnChange}
                            >
                                Vencimento*
                            </Input>
                            <p
                                className='message-error-register-charge'
                            >
                                {errorMessage.expiration.message}
                            </p>
                        </div>

                        <div className="value-box">
                            <label>Valor*</label>
                            <CurrencyInput
                                className={`value-input  ${errorMessage.value.classType}`}
                                id="value-register-charge"
                                name="value"
                                placeholder="Digite o valor"
                                decimalsLimit={2}
                                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                                onValueChange={(value) => handleValueChange(value)}
                            />
                            <p
                                className='message-error-register-charge'
                            >
                                {errorMessage.value.message}
                            </p>
                        </div>

                    </div>

                    <div className='container-register-type-charge'>
                        <p>Status:*</p>
                        <InputRadio
                            id='register-type-charge-paid'
                            name='typeCharge'
                            type='radio'
                            value={true}
                            onClick={handleRadioInput}
                            isMarked={true}
                        >
                            Cobrança Paga
                        </InputRadio>
                        <InputRadio
                            id='register-type-charge-pendent'
                            name='typeCharge'
                            type='radio'
                            value={false}
                            onClick={handleRadioInput}
                        >
                            Cobrança Pendente
                        </InputRadio>
                    </div>

                    <div className='container-register-charge-buttons'>

                        <Button
                            handleButton={handleCancelRegisterCharge}
                            type='reset'
                            width={231}
                        >
                            Cancelar
                        </Button>
                        <Button width={231}>
                            Aplicar
                        </Button>

                    </div>
                </form>
            </div>

        </div >
    )
}


export default ModalRegisterCharge