import './style.css'
import imgClose from '../../assets/close-img.svg'
import hidePasswordImg from '../../assets/hide-password.svg'
import showPasswordImg from '../../assets/show-password.svg'
import checkImg from '../../assets/sign-up-concluded.svg'

import Input from '../Input/index'
import Button from '../Button/index'
import { useState } from 'react'
import usePageMode from '../../hooks/usePageMode'
import MaskedInput from '../MaskedInput'

import api from '../../services/api'
import { getItem, setItem } from '../../utils/localStorage'


const errorTypes = {
    name: {
        message: '',
        classType: ''
    },
    email: {
        message: '',
        classType: ''
    },
    cpf: {
        message: '',
        classType: ''
    },
    telephone: {
        message: '',
        classType: ''
    },
    password: {
        message: '',
        classType: ''
    },
    confirmationPassword: {
        message: '',
        classType: ''
    }
}


function ModalEditUser({ setShowUserModal }) {
    const { userDataEdited, setUserDataEdited } = usePageMode();
    const [errorMessage, setErrorMessage] = useState(errorTypes)
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setshowPasswordConfirmation] = useState(false)
    const [sucessEditedUserInfo, setSucessEditedUserInfo] = useState(false)

    const token = getItem('token')


    const handleOnChange = ({ target }) => {
        setErrorMessage(errorTypes)
        setUserDataEdited({ ...userDataEdited, [target.name]: target.value })
    }

    const handleMaskedOnChange = ({ target }) => {
        const treated = (target.value).replace(/\D/g, '')
        setUserDataEdited({ ...userDataEdited, [target.name]: treated })
    }


    const handleCloseEditModal = () => {
        setTimeout(
            () => { handleCloseModal() }
            , 2000)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleShowPasswordConfirmation = () => {
        setshowPasswordConfirmation(!showPasswordConfirmation)
    }

    const handleCloseModal = () => {
        setUserDataEdited({
            ...userDataEdited,
            password: '',
            confirmationPassword: ''
        })
        setShowUserModal(false)
    }


    const getUserData = async (token) => {
        const responseDataToBeEdited = await api.get('/usuario', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return responseDataToBeEdited.data;
    }

    const sendPutUpdateUser = async (dataToBeSended, token) => {
        try {
            return await api.put('/usuario',
                dataToBeSended,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        } catch (error) {
            return
        }
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault()

        if (!userDataEdited.name) {
            return setErrorMessage({
                ...errorMessage,
                name: {
                    message: 'Este campo deve ser preenchido',
                    classType: 'input-avoid'
                }
            })
        }

        if (!userDataEdited.email) {
            return setErrorMessage({
                ...errorMessage,
                email: {
                    message: 'Este campo deve ser preenchido',
                    classType: 'input-avoid'
                }
            })
        }

        if (!userDataEdited.password) {
            return setErrorMessage({
                ...errorMessage,
                password: {
                    message: 'Este campo deve ser preenchido',
                    classType: 'input-avoid'
                }
            })
        }

        if (!userDataEdited.confirmationPassword) {
            return setErrorMessage({
                ...errorMessage,
                confirmationPassword: {
                    message: 'Este campo deve ser preenchido',
                    classType: 'input-avoid'
                }
            })
        }

        if (userDataEdited.password !== userDataEdited.confirmationPassword) {
            return setErrorMessage({
                ...errorMessage,
                password: {
                    classType: 'input-avoid'
                },
                confirmationPassword: {
                    message: 'As senhas não coincidem',
                    classType: 'input-avoid'
                }
            })
        }

        try {
            const newDataUser = {
                nome: userDataEdited.name,
                senha: userDataEdited.password,
                email: userDataEdited.email,
                cpf: userDataEdited.cpf,
                telefone: userDataEdited.telephone
            }

            sendPutUpdateUser(newDataUser, token)

            const userLocalStorage = JSON.parse(getItem('user'))
            const stringfiedNewUserData = JSON.stringify({ id: userLocalStorage.id, nome: userDataEdited.name })
            setItem('user', stringfiedNewUserData)

            setSucessEditedUserInfo(true)

            return handleCloseEditModal()
        } catch (error) {
        }
    }

    return (
        <div className="modal-background-edit-user">
            {sucessEditedUserInfo ?
                <div className='modal-sucess-edit'>
                    <img src={checkImg} alt="imagem de check" />
                    <p>
                        Cadastro alterado com sucesso!
                    </p>
                </div>
                :
                <div className="modal-content-edit-user">
                    <div className='modal-close-button-edit-user'>
                        <img
                            src={imgClose}
                            alt="Botão para sair do formulário de editar cadastro."
                            onClick={handleCloseModal}
                        />
                    </div>
                    <form onSubmit={handleOnSubmit}>
                        <div className='header-form-edit-user'>
                            <h2>
                                Edite seu cadastro
                            </h2>
                        </div>

                        <Input
                            id='name-edit-user'
                            name='name'
                            type='text'
                            placeholder='Digite seu nome'
                            className={errorMessage.name.classType}
                            value={userDataEdited.name}
                            onChange={handleOnChange}
                        >
                            Nome*
                        </Input>
                        <p
                            className='message-error-edit-user'
                        >
                            {errorMessage.name.message}
                        </p>

                        <Input
                            id='email-edit-user'
                            name='email'
                            type='email'
                            placeholder='Digite seu e-mail'
                            className={errorMessage.email.classType}
                            value={userDataEdited.email}
                            onChange={handleOnChange}
                        >
                            E-mail*
                        </Input>
                        <p
                            className='message-error-edit-user'
                        >
                            {errorMessage.email.message}
                        </p>

                        <div className='container-edit-user-input-optional'>
                            <MaskedInput
                                id='cpf-edit-user'
                                name='cpf'
                                type='text'
                                placeholder='Digite seu CPF'
                                className={errorMessage.cpf.classType}
                                value={userDataEdited.cpf}
                                mask="999.999.999-99"
                                onChange={handleMaskedOnChange}
                            >
                                CPF
                            </MaskedInput>

                            <MaskedInput
                                id='telephone-edit-user'
                                name='telephone'
                                type='text'
                                placeholder='Digite seu telefone'
                                className={errorMessage.telephone.classType}
                                value={userDataEdited.telephone}
                                mask="(99) 99999-9999"
                                onChange={handleMaskedOnChange}
                            >
                                Telefone
                            </MaskedInput>

                        </div>

                        <div>
                            <Input
                                id='password-edit-user'
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='••••••••'
                                className={errorMessage.password.classType}
                                value={userDataEdited.password}
                                onChange={handleOnChange}
                            >
                                Nova Senha*
                            </Input>
                            <p
                                className='message-error-edit-user'
                            >
                                {errorMessage.password.message}
                            </p>
                            <img
                                onClick={handleShowPassword}
                                src={showPassword ? showPasswordImg : hidePasswordImg}
                                alt='Mostrar ou esconder senha'
                                className='show-hide-password-icon'
                            />
                        </div>

                        <div>

                            <Input
                                id='repeat-password-edit-user'
                                name='confirmationPassword'
                                type={showPasswordConfirmation ? 'text' : 'password'}
                                placeholder='••••••••'
                                className={errorMessage.confirmationPassword.classType}
                                value={userDataEdited.confirmationPassword}
                                onChange={handleOnChange}
                            >
                                Confirmar Senha*
                            </Input>
                            <p
                                className='message-error-edit-user'
                            >
                                {errorMessage.confirmationPassword.message}
                            </p>
                            <img
                                onClick={handleShowPasswordConfirmation}
                                src={showPasswordConfirmation ? showPasswordImg : hidePasswordImg}
                                alt='Mostrar ou esconder senha'
                                className='show-hide-password-icon'
                            />
                        </div>

                        <Button width={231}>
                            Aplicar
                        </Button>
                    </form>
                </div>

            }
        </div >
    )
}


export default ModalEditUser