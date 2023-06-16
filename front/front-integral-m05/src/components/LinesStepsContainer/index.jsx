import './style.css'
import LineStep from '../../components/LineStep'


function LinesStepsContainer({ stepPage }) {

    return (
        <div className='line-steps-container-component'>
            {
                stepPage == '1' &&
                <>
                    <LineStep
                        step='on'
                        navigate='/sign-up'
                    />
                    <LineStep
                        step='off'
                        navigate='/sign-up/password'
                    />
                    <LineStep
                        step='off'
                        navigate='/sign-up/finish'
                    />
                </>
            }
            {
                stepPage == '2' &&
                <>
                    <LineStep
                        step='off'
                        navigate='/sign-up'
                    />
                    <LineStep
                        step='on'
                        navigate='/sign-up/password'

                    />
                    <LineStep
                        step='off'
                        navigate='/sign-up/finish'
                    />
                </>
            }
            {
                stepPage == '3' &&
                <>
                    <LineStep
                        step='off'
                        navigate='/sign-up'
                    />
                    <LineStep
                        step='off'
                        navigate='/sign-up/password'
                    />
                    <LineStep
                        step='on'
                        navigate='/sign-up/finish'
                    />
                </>
            }
        </div>
    )
}


export default LinesStepsContainer