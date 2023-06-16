import './style.css'
import circleFully from '../../assets/circle-fully.svg'
import circleEmpty from '../../assets/circle-empty.svg'
import circleCheck from '../../assets/circle-check.svg'
import { useNavigate } from 'react-router-dom'
useNavigate

function SignUpStep({ name, body, line, step, navigate }) {

    const navigateTo = useNavigate()

    const checkStep = () => {
        if (step === 'on') {
            return circleFully
        }
        if (step === 'next') {
            return circleEmpty
        }
        if (step === 'done') {
            return circleCheck
        }
    }

    const navigateToStep = () => {
        navigateTo(navigate)
    }

    return (
        <div className='container-sign-up-step'>
            <div className='title-sign-up-step'>
                <img
                    src={checkStep()}
                    onClick={navigateToStep}
                />
                <p>
                    {name}
                </p>
            </div>
            <span className={line}>
                {body}
            </span>

        </div>
    )
}


export default SignUpStep