import './style.css'
import stepOn from '../../assets/step-on.svg'
import stepOut from '../../assets/step-out.svg'
import { useNavigate } from 'react-router-dom'


function LineStep({ step, navigate }) {
    const navigateTo = useNavigate()

    const handleNavigateTo = () => {
        navigateTo(navigate)
    }

    const verifyStep = () => {
        if (step === 'on') {
            return stepOn
        }
        if (step === 'off') {
            return stepOut
        }
    }
    return (
        <>
            <img
                className='step-line-img-component'
                src={verifyStep()}
                onClick={handleNavigateTo}
            />
        </>
    )
}

export default LineStep