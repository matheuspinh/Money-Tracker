import { createSearchParams, useNavigate } from 'react-router-dom'
import ChargeDetailsTable from '../ChargeDetailsTable'
import './style.css'

function ChargeDetails({ children, type, listChargesData }) {
    const navigate = useNavigate()
    const localChargesData = [...listChargesData]
    const listChargesDataReverse = localChargesData.slice(0).reverse()
    const chargesToBeDisplayed = listChargesDataReverse.slice(0, 4)
    const chargesToBeDisplayedFormated = chargesToBeDisplayed.map((charge) => {
        return {
            id: charge.id,
            client: charge.nome,
            value: charge.valor
        }
    })

    const handleClick = (filter) => {
        navigate({
            pathname: '/charges',
            search: `?${createSearchParams({ status: filter })}`
        })
    }

    return (
        <div className='container-charge-details'>
            <div className='title-charge-details'>
                <h1>{children}</h1>
                <span
                    className={`quantity-charges ${type}`}
                >
                    {String(listChargesData.length).padStart(2, '0')}
                </span>
            </div>
            <ChargeDetailsTable
                chargeData={chargesToBeDisplayedFormated}
            />

            <div
                onClick={() => handleClick(type)}
                className='expand-charges-button'
            >
                Ver todos
            </div>

        </div>
    )
}

export default ChargeDetails