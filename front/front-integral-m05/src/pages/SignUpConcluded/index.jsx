import './style.css'

import signUpConcluded from '../../assets/sign-up-concluded.svg'

import SignUpStep from '../../components/SignUpStep/index'
import Button from '../../components/Button/index'
import LinesStepsContainer from '../../components/LinesStepsContainer'

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getItem } from '../../utils/localStorage'
import usePageMode from '../../hooks/usePageMode'



function SignUpConcluded() {
    const {
        setUserDataSignUp,
        setUserPassword,
        setAllowSignUpSucess } = usePageMode();

    const navigateTo = useNavigate()

    const handleButtonSignUpFinish = () => {
        setAllowSignUpSucess(false)
        navigateTo('/login')
    }

    useEffect(() => {
        const logged = getItem('token')

        if (logged) {
            navigateTo('/')
        };
        setUserDataSignUp({ name: '', email: '' })
        setUserPassword({ password: '', passwordConfirmation: '' })

        setTimeout(() => {
            setAllowSignUpSucess(false)
            navigateTo('/login')
        }, 1500)
    }, [])

    return (
        <div className='container-sign-up-concluded'>
            <div className='container-sign-up-concluded-left'>
                <SignUpStep
                    name='Cadastre-se'
                    body='Por favor, escreva seu nome e e-mail'
                    line='line'
                    step='done'
                    navigate='/login'
                />
                <SignUpStep
                    name='Escolha uma senha'
                    body='Escolha uma senha segura'
                    line='line'
                    step='done'
                    navigate='/login'
                />
                <SignUpStep
                    name='Cadastro realizado com sucesso'
                    body='E-mail e senha cadastrados com sucesso'
                    step='done'
                    navigate='/login'
                />
            </div>
            <div className='container-sign-up-concluded-right'>
                <div className='container-message-sign-up-concluded'>
                    <img
                        src={signUpConcluded}
                    />
                    <h1>
                        Cadastro realizado com sucesso!
                    </h1>
                </div>

                <div>
                    <Button
                        handleButton={handleButtonSignUpFinish}
                        width={180}
                    >
                        Ir para Login
                    </Button>
                </div>

                <LinesStepsContainer
                    stepPage='3'
                />
            </div>
        </div>
    )
}

export default SignUpConcluded