import './style.css'
import imgClose from '../../assets/close-img.svg'
import imgPage from '../../assets/icon-page.svg'
import usePageMode from '../../hooks/usePageMode'


function ModalChargeDetails({ handleOpenSucessEditCharge }) {
    const { setShowModalChargesDetails, dataModalChargeDetails } = usePageMode()

    const handleCloseModal = () => {
        setShowModalChargesDetails(false)
    }

    function formatDate(date) {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(new Date(date)).split(', ')
    }

    const date = new Date(dataModalChargeDetails.expiration).toLocaleString('pt-br', { timeZone: 'UTC' })
    const dateFormatted = date.split(',')[0]

    const verifyStatus = () => {
        const dateISOFormatted = (date) => date.toISOString().split('T')[0]

        if (dataModalChargeDetails.typeCharge === true) {
            return {
                class: 'charge-paid',
                text: 'Pago'
            }
        }

        if (dataModalChargeDetails.typeCharge === false &&
            dateISOFormatted(new Date(dataModalChargeDetails.expiration)) >= dateISOFormatted(new Date())) {
            return {
                class: 'charge-pending',
                text: 'Pendente'
            }
        }

        return {
            class: 'charge-expired',
            text: 'Vencida'
        }
    }

    return (
        <div className="modal-background-charge-detail">

            <div className="modal-content-charge-detail">
                <div className='modal-close-button-charge-detail'>
                    <img
                        src={imgClose}
                        alt="Botão para sair do formulário de detalhes da cobrança."
                        onClick={handleCloseModal}
                    />
                </div>
                <div className='header-charge-detail'>
                    <img src={imgPage} />
                    <h2>
                        Detalhe da Cobrança
                    </h2>
                </div>
                <div className='body-charge-details'>
                    <div className='charge-detail-name'>
                        <p>
                            Nome
                        </p>
                        <span>
                            {dataModalChargeDetails.name}
                        </span>
                    </div>
                    <div className='charge-detail-description'>
                        <p>
                            Descrição
                        </p>
                        <span>
                            {dataModalChargeDetails.description}
                        </span>
                    </div>
                    <div className='container-minor-details'>
                        <div className='charge-detail-expire-id'>
                            <div>
                                <p>
                                    Vencimento
                                </p>
                                <span>
                                    {dateFormatted}
                                </span>

                            </div>

                            <div>
                                <p>
                                    ID cobranças
                                </p>
                                <span>
                                    {dataModalChargeDetails.idCharge}
                                </span>
                            </div>
                        </div>
                        <div className='charge-detail-value-status'>
                            <div>
                                <p>
                                    Valor
                                </p>
                                <span>
                                    {`R$ ${((dataModalChargeDetails.value) / 100).toFixed(2).replace('.', ',')}`}
                                </span>
                            </div>
                            <div>
                                <p>
                                    Status
                                </p>
                                <span className={verifyStatus().class}>
                                    {verifyStatus().text}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div >
    )
}


export default ModalChargeDetails