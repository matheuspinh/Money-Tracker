import './style.css'
import imgClose from '../../assets/close-img.svg'
import deleteChargeImg from '../../assets/icon-delete-charge.svg'

import api from '../../services/api'
import { getItem } from '../../utils/localStorage'
import usePageMode from '../../hooks/usePageMode'
import useChargesList from '../../hooks/useChargesList'


function ModalDeleteCharge({ handleOpenSucessDeleteCharge, handleOpenFailDeleteCharge }) {
    const { setShowModalDeleteCharge, setDataModalDeleteCharge, dataModalDeleteCharge, chargeUniqueClient, setChargeUniqueClient } = usePageMode()
    const { chargesList, setChargesList } = useChargesList()

    const handleCloseModal = () => {
        setDataModalDeleteCharge({ idCharge: '' })
        setShowModalDeleteCharge(false)
    }

    const handleDeleteCharge = async () => {
        const dateISOFormatted = (date) => date.toISOString().split('T')[0]

        if (dataModalDeleteCharge.chargePaidOut === true) {
            handleCloseModal()
            return handleOpenFailDeleteCharge()
        }
        if (dateISOFormatted(new Date(dataModalDeleteCharge.chargeDeadline)) < dateISOFormatted(new Date())) {
            handleCloseModal()
            return handleOpenFailDeleteCharge()
        }

        try {
            const token = getItem('token')
            const responseChargeDataSend = await await api.
                delete(`/cobranca/${dataModalDeleteCharge.idCharge}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
            if (responseChargeDataSend.status === 204) {
                const localChargesList = [...chargesList];
                const newListOfCharges = localChargesList.filter(charge => charge.id !== dataModalDeleteCharge.idCharge)

                const localUniqueClientList = [...chargeUniqueClient]
                const newListUniqueClient = localUniqueClientList.filter(charge => charge.id !== dataModalDeleteCharge.idCharge)

                setChargesList(newListOfCharges)
                setChargeUniqueClient(newListUniqueClient)
                handleCloseModal()
                return handleOpenSucessDeleteCharge()
            }
        } catch (error) {
            return
        }
    }

    const handleCancelDeleteCharge = () => {
        setDataModalDeleteCharge({ idCharge: '' })
        setShowModalDeleteCharge(false)
    }



    return (
        <div className="modal-background-delete-charge">
            <div className="modal-content-delete-charge">
                <div className='modal-close-button-delete-charge'>
                    <img
                        src={imgClose}
                        alt="Botão para sair da deleção de cobrança."
                        onClick={handleCloseModal}
                    />
                </div>

                <img src={deleteChargeImg} alt="Imagem da atenção" />
                <p>
                    Tem certeza que deseja excluir esta cobrança?
                </p>

                <div className='container-buttons-delete-charge'>
                    <span
                        onClick={handleCancelDeleteCharge}
                    >
                        Não
                    </span>
                    <span
                        onClick={handleDeleteCharge}
                    >
                        Sim
                    </span>
                </div>

            </div>
        </div >
    )
}


export default ModalDeleteCharge