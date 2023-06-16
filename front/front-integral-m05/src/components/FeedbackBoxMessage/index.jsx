import './style.css'
import SuccessIcon from '../../assets/success-check.svg'
import FailIcon from '../../assets/fail-icon.svg'
import FailClose from '../../assets/close-img-fail.svg'
import CloseIcon from '../../assets/close-img.svg'

export default function FeedbackBoxMessage({ children, handleCloseFeedback, type }) {
    return (
        type === 'fail' ?

            <div className='feedback-box fail'>
                <img
                    src={FailIcon}
                    className='feedback-icon'
                />
                <p>
                    {children}
                </p>
                <img
                    onClick={handleCloseFeedback}
                    src={FailClose}
                    className='close-feedback'
                />
            </div>

            :
            <div className='feedback-box'>
                <img
                    src={SuccessIcon}
                    className='feedback-icon'
                />
                <p>
                    {children}
                </p>
                <img
                    onClick={handleCloseFeedback}
                    src={CloseIcon}
                    className='close-feedback'
                />
            </div>
    )
}