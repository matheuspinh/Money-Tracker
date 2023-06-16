import './style.css'
import hidePasswordImg from '../../assets/hide-password.svg'
import showPasswordImg from '../../assets/show-password.svg'

import SignUpStep from '../../components/SignUpStep/index'
import Input from '../../components/Input'
import Button from '../../components/Button/index'
import LinesStepsContainer from '../../components/LinesStepsContainer'

import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import usePageMode from '../../hooks/usePageMode'

import api from '../../services/api'
import { getItem } from '../../utils/localStorage'

const errorPasswordBase = {
    message: '',
    classType: ''
}


function SignUpPassword() {
    const { userDataSignUp, userPassword, setUserPassword, setAllowSignUpSucess } = usePageMode()

    const [errorPasword, setErrorPassword] = useState(errorPasswordBase)
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setshowPasswordConfirmation] = useState(false)


    const navigateTo = useNavigate()

    const handleOnChange = ({ target }) => {
        setErrorPassword(errorPasswordBase)
        setUserPassword({ ...userPassword, [target.name]: target.value })
    }

    const handleSubmitPassword = async (event) => {
        event.preventDefault()

        if (!userPassword.password || !userPassword.passwordConfirmation) {
            return setErrorPassword({
                message: 'Estes campos deve ser preenchido',
                classType: 'input-avoid'
            })
        }

        if (userPassword.password !== userPassword.passwordConfirmation) {
            return setErrorPassword({
                message: 'As senhas não coincidem',
                classType: 'input-avoid'
            })
        }

        if (!userDataSignUp.name || !userDataSignUp.email) {
            return setErrorPassword({
                message: 'Preencha os campos anteriores do cadastro',
                classType: ''
            })
        }

        try {
            const dataSignUpUser = {
                nome: userDataSignUp.name,
                email: userDataSignUp.email,
                senha: userPassword.password
            }

            const responseSignUpUser = await api.post('/usuario', dataSignUpUser)

            if (responseSignUpUser.status === 201) {
                setAllowSignUpSucess(true)
                return navigateTo('/sign-up/finish')
            }
        } catch (error) {
            if (error.response.data.mensagem === 'E-mail já cadastrado') {
                return setErrorPassword({
                    message: 'Por favor, altere o e-mail para cadastro',
                    classType: ''
                })
            }

        }
    }

    const handleLinkToLogin = () => {
        navigateTo('/login')
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleShowPasswordConfirmation = () => {
        setshowPasswordConfirmation(!showPasswordConfirmation)
    }

    useEffect(() => {
        const logged = getItem('token')

        if (logged) {
            navigateTo('/')
        }
    }, [])


    return (
        <div className='container-sign-up-password'>
            <div className='container-sign-up-password-left'>
                <SignUpStep
                    name='Cadastre-se'
                    body='Por favor, escreva seu nome e e-mail'
                    line='line'
                    step='done'
                    navigate='/sign-up'
                />
                <SignUpStep
                    name='Escolha uma senha'
                    body='Escolha uma senha segura'
                    line='line'
                    step='on'
                    navigate='/sign-up/password'
                />
                <SignUpStep
                    name='Cadastro realizado com sucesso'
                    body='E-mail e senha cadastrados com sucesso'
                    step='next'
                    navigate='/sign-up/finish'
                />
            </div>
            <div className='container-sign-up-password-right'>
                <form onSubmit={handleSubmitPassword}>
                    <h1>Escolha uma senha</h1>

                    <div>
                        <Input
                            id='password'
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Insira uma senha'
                            className={errorPasword.classType}
                            value={userPassword.password}
                            onChange={handleOnChange}
                        >
                            Senha*
                        </Input>
                        <img
                            onClick={handleShowPassword}
                            src={showPassword ? showPasswordImg : hidePasswordImg}
                            alt='Mostrar ou esconder senha'
                            className='show-hide-password-icon'
                        />
                    </div>

                    <div>

                        <Input
                            id='password-confirmation'
                            name='passwordConfirmation'
                            type={showPasswordConfirmation ? 'text' : 'password'}
                            placeholder='Insira sua senha novamente'
                            className={errorPasword.classType}
                            value={userPassword.passwordConfirmation}
                            onChange={handleOnChange}
                        >
                            Repita a senha*
                        </Input>
                        <img
                            onClick={handleShowPasswordConfirmation}
                            src={showPasswordConfirmation ? showPasswordImg : hidePasswordImg}
                            alt='Mostrar ou esconder senha'
                            className='show-hide-password-icon'
                        />
                    </div>
                    <p
                        className='message-error'
                    >{errorPasword.message}</p>

                    <div className='container-button-form-password'>
                        <Button width={180}>
                            Finalizar cadastro
                        </Button>
                        <p>
                            Já possui uma conta? Faça seu <span onClick={handleLinkToLogin}>Login</span>
                        </p>
                    </div>
                </form>

                <LinesStepsContainer
                    stepPage='2'
                />
            </div>
        </div>
    )
}

export default SignUpPassword