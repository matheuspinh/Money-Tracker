import './style.css'

function ChargeDetailsTable({ chargeData }) {

    const createMaskValue = (value) => {
        const valueFormated = (value / 100).toFixed(2).replace('.', ',')
        return valueFormated
    }

    return (
        <table className='table-charges'>
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>ID da cob.</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                {chargeData.map((charge) => (
                    < tr
                        key={charge.id}
                        className='table-row-charges'
                    >
                        <td>{charge.client.length > 12
                            ? charge.client.slice(0, 12).trim() + '...'
                            : charge.client}</td>

                        <td>{charge.id}</td>
                        <td>R$ {createMaskValue(charge.value)}</td>
                    </tr>
                ))}
            </tbody>
        </table >
    );
}

export default ChargeDetailsTable