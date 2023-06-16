import './style.css'
import imgClose from '../../assets/close-img.svg'
import imgPage from '../../assets/icon-page.svg'

import Input from '../Input/index'
import InputRadio from '../InputRadio'
import InputTextArea from '../InputTextArea'
import Button from '../Button/index'
import { useState } from 'react'
import usePageMode from '../../hooks/usePageMode'
import useChargesList from '../../hooks/useChargesList'
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

const dataEditChargeBase = {
    description: '',
    expiration: '',
    value: '',
    paid: true
}

const modalEditChargeDataBase = {
    idCharge: '',
    name: '',
    value: '',
    expiration: '',
    description: '',
    typeCharge: ''
}


function ModalEditCharge({ handleOpenSucessEditCharge }) {
    const { setShowModalEditCharge, dataModalEditCharge, chargeUniqueClient, setChargeUniqueClient } = usePageMode()
    const { chargesList, setChargesList } = useChargesList()

    const [errorMessage, setErrorMessage] = useState(errorTypes)
    const [localEditChargeData, setLocalEditChargeData] = useState({ ...dataModalEditCharge })


    const handleOnChange = ({ target }) => {
        setErrorMessage(errorTypes)
        setLocalEditChargeData({ ...localEditChargeData, [target.name]: target.value })
    }

    const handleValueChange = (value) => {
        setErrorMessage(errorTypes)

        if (value && !value.includes(',')) {
            let formatted = parseInt(value.replace(',', ''))
            formatted = formatted * 100
            return setLocalEditChargeData({ ...localEditChargeData, value: formatted })
        } else if (value && value.includes(',')) {
            const reais = value.split(',')[0]
            const cents = value.split(',')[1].padEnd(2, '0')
            const newValue = reais + cents
            let formatted = parseInt(newValue)
            return setLocalEditChargeData({ ...localEditChargeData, value: formatted })
        }
        return setLocalEditChargeData({ ...localEditChargeData, value })
    }

    const handleRadioInput = ({ target }) => {
        const value = target.value === 'true' ? true : false
        setLocalEditChargeData({
            ...localEditChargeData,
            typeCharge: value
        })
    }

    const handleCloseModal = () => {
        setShowModalEditCharge(false)
    }

    const handleCancelEditCharge = (event) => {
        event.stopPropagation()
        handleCloseModal()
    }


    const handleOnSubmit = async (event) => {
        event.preventDefault()

        if (!localEditChargeData.description) {
            return setErrorMessage({
                ...errorMessage,
                description: {
                    message: 'Este campo deve ser preenchido',
                    classType: 'input-avoid'
                }
            })
        }

        if (!localEditChargeData.expiration) {
            return setErrorMessage({
                ...errorMessage,
                expiration: {
                    message: 'Este campo deve ser preenchido',
                    classType: 'input-avoid'
                }
            })
        }


        if (!localEditChargeData.value) {
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
                id: localEditChargeData.idCharge,
                descricao: localEditChargeData.description,
                vencimento: localEditChargeData.expiration,
                valor: localEditChargeData.value,
                pago: localEditChargeData.typeCharge
            }

            const token = getItem('token')
            const responseChargeDataSend = await await api.put('/cobranca', chargeDataToBeSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (responseChargeDataSend.status === 200) {
                const localClientsList = [...chargesList]
                const localListChargesUniqueClient = [...chargeUniqueClient]


                const indexChargeModified = localClientsList.findIndex((charge) => charge.id === localEditChargeData.idCharge)
                const indexChargeModifiedUnique = localListChargesUniqueClient.findIndex((charge) => charge.id === localEditChargeData.idCharge)

                localClientsList[indexChargeModified] = {
                    ...localClientsList[indexChargeModified],
                    descricao: localEditChargeData.description,
                    vencimento: `${localEditChargeData.expiration}T00:00:00.000Z`, // Antes tava T03:00:00.000Z
                    valor: localEditChargeData.value,
                    pago: localEditChargeData.typeCharge
                }

                localListChargesUniqueClient[indexChargeModifiedUnique] = {
                    ...localListChargesUniqueClient[indexChargeModifiedUnique],
                    descricao: localEditChargeData.description,
                    vencimento: `${localEditChargeData.expiration}T00:00:00.000Z`,
                    valor: localEditChargeData.value,
                    pago: localEditChargeData.typeCharge
                }



                setChargesList([...localClientsList])
                setChargeUniqueClient([...localListChargesUniqueClient])
                handleOpenSucessEditCharge()
                handleCloseModal()
                return
            }
        } catch (error) {
            return
        }

    }

    return (
        <div className="modal-background-edit-charge">

            <div className="modal-content-edit-charge">
                <div className='modal-close-button-edit-charge'>
                    <img
                        src={imgClose}
                        alt="Botão para sair do formulário de editar cadastro."
                        onClick={handleCloseModal}
                    />
                </div>
                <form onSubmit={handleOnSubmit}>
                    <div className='header-form-edit-charge'>
                        <img src={imgPage} />
                        <h2>
                            Edição de cobrança
                        </h2>
                    </div>

                    <Input
                        id='client-name-edit-charge'
                        name='name'
                        type='text'
                        value={localEditChargeData.name}
                        readOnly={'readOnly'}
                    >
                        Nome*
                    </Input>

                    <InputTextArea
                        id='description-edit-charge'
                        name='description'
                        type='text'
                        placeholder='Digite a descrição'
                        className={errorMessage.description.classType}
                        value={localEditChargeData.description}
                        onChange={handleOnChange}
                    >
                        Descrição*
                    </InputTextArea>
                    <p
                        className='message-error-edit-charge'
                    >
                        {errorMessage.description.message}
                    </p>

                    <div
                        className='container-edit-charge-input-numbers'>
                        <div>
                            <Input
                                id='expiration-edit-charge'
                                name='expiration'
                                type='date'
                                placeholder='Digite o vencimento'
                                className={errorMessage.expiration.classType}
                                value={localEditChargeData.expiration}
                                onChange={handleOnChange}
                            >
                                Vencimento*
                            </Input>
                            <p
                                className='message-error-edit-charge'
                            >
                                {errorMessage.expiration.message}
                            </p>
                        </div>

                        <div className="value-box">
                            <label>Valor*</label>
                            <CurrencyInput
                                className={`value-input ${errorMessage.value.classType}`}
                                id="value-edit-charge"
                                name="value"
                                placeholder="Digite o valor"
                                decimalsLimit={2}
                                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                                defaultValue={((localEditChargeData.value) / 100).toFixed(2)}
                                onValueChange={handleValueChange}
                            />
                            <p
                                className='message-error-edit-charge'
                            >
                                {errorMessage.value.message}
                            </p>
                        </div>

                    </div>

                    <div className='container-edit-type-charge'>
                        <p>Status:*</p>
                        <InputRadio
                            id='edit-type-charge-paid'
                            name='typeCharge'
                            type='radio'
                            value={true}
                            onClick={handleRadioInput}
                            isMarked={localEditChargeData.typeCharge ? true : false}
                        >
                            Cobrança Paga
                        </InputRadio>
                        <InputRadio
                            id='edit-type-charge-pendent'
                            name='typeCharge'
                            type='radio'
                            value={false}
                            onClick={handleRadioInput}
                            isMarked={localEditChargeData.typeCharge ? false : true}
                        >
                            Cobrança Pendente
                        </InputRadio>
                    </div>

                    <div className='container-edit-charge-buttons'>

                        <Button
                            handleButton={handleCancelEditCharge}
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


export default ModalEditCharge