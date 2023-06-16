import './style.css'

function InputRadio({ id, name, children, type, value, onClick, isMarked, checked }) {

    return (
        <label
            htmlFor={id}
            className='container-input-radio-component'
        >
            {isMarked ? <input
                id={id}
                name={name}
                type={type}
                value={value}
                onClick={onClick}
                defaultChecked
            />
                :
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onClick={onClick}
                />
            }


            {children}
        </label>
    )
}

export default InputRadio