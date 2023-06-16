import './style.css'

import SignUpStep from '../../components/SignUpStep/index'
import Input from '../../components/Input'
import Button from '../../components/Button/index'
import LinesStepsContainer from '../../components/LinesStepsContainer'

import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import usePageMode from '../../hooks/usePageMode'
import api from '../../services/api'
import { getItem } from '../../utils/localStorage'

const errorTypes = {
    name: {
        message: '',
        classType: ''
    },
    email: {
        message: '',
        classType: ''
    }
}

function SignUpEMail() {
    const { userDataSignUp, setUserDataSignUp } = usePageMode()
    const [signUpError, setSignUpError] = useState(errorTypes)


    const navigateTo = useNavigate()

    const handleOnChange = ({ target }) => {
        setSignUpError({
            ...errorTypes
        })
        setUserDataSignUp({ ...userDataSignUp, [target.name]: target.value })
    }

    const handleSubmitEmail = async (event) => {
        event.preventDefault()

        if (!userDataSignUp.name) {
            setSignUpError({
                ...signUpError,
                name: {
                    message: 'Este campo deve ser preenchido',
                    classType: 'input-avoid'
                }
            })
            return
        }

        if (!userDataSignUp.email) {
            setSignUpError({
                ...signUpError,
                email: {
                    message: 'Este campo deve ser preenchido',
                    classType: 'input-avoid'
                }
            })
            return
        }

        const emailSecondPart = userDataSignUp.email.split('@')[1]
        if (!emailSecondPart.includes('.')) {
            setSignUpError({
                ...signUpError,
                email: {
                    message: 'Preencha o campo com um e-mail válido',
                    classType: 'input-avoid'
                }
            })
            return
        }



        try {
            const responseVerifyEmail = await api.get(`/usuario/${userDataSignUp.email}`)
            if (responseVerifyEmail.status === 200) {
                setUserDataSignUp({
                    ...userDataSignUp,
                    name: userDataSignUp.name,
                    email: userDataSignUp.email
                })

                return navigateTo('/sign-up/password')
            }
        } catch (error) {
            if (error.response.status === 409) {
                return setSignUpError({
                    ...signUpError,
                    email: {
                        message: 'E-mail já cadastrado',
                        classType: 'input-avoid'
                    }
                })
            }
        }
    }

    const handleLinkToLogin = () => {
        navigateTo('/login')
    }

    useEffect(() => {
        const logged = getItem('token')

        if (logged) {
            navigateTo('/')
        }
    }, [])


    return (
        <div className='container-sign-up-email'>
            <div className='container-sign-up-email-left'>
                <SignUpStep
                    name='Cadastre-se'
                    body='Por favor, escreva seu nome e e-mail'
                    line='line'
                    step='on'
                    navigate='/sign-up'
                />
                <SignUpStep
                    name='Escolha uma senha'
                    body='Escolha uma senha segura'
                    line='line'
                    step='next'
                    navigate='/sign-up/password'
                />
                <SignUpStep
                    name='Cadastro realizado com sucesso'
                    body='E-mail e senha cadastrados com sucesso'
                    step='next'
                    navigate='/sign-up/finish'
                />
            </div>
            <div className='container-sign-up-email-right'>
                <form onSubmit={handleSubmitEmail}>
                    <h1>Adicione seus dados</h1>

                    <Input
                        id='name'
                        name='name'
                        type='text'
                        placeholder='Digite seu nome'
                        className={signUpError.name.classType}
                        value={userDataSignUp.name}
                        onChange={handleOnChange}
                    >
                        Nome*
                    </Input>
                    <p
                        className='message-error-name-email'
                    >
                        {signUpError.name.message}
                    </p>

                    <Input
                        id='email'
                        name='email'
                        type='email'
                        placeholder='Digite seu e-mail'
                        className={signUpError.email.classType}
                        value={userDataSignUp.email}
                        onChange={handleOnChange}
                    >
                        E-mail*
                    </Input>
                    <p
                        className='message-error-name-email'
                    >
                        {signUpError.email.message}
                    </p>

                    <div className='container-button-form-email'>
                        <Button width={180}>
                            Continuar
                        </Button>
                        <p>
                            Já possui uma conta? Faça seu <span onClick={handleLinkToLogin}>Login</span>
                        </p>
                    </div>
                </form>

                <LinesStepsContainer
                    stepPage='1'
                />
            </div>
        </div>
    )
}

export default SignUpEMail