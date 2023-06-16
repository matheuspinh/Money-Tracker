import './style.css'
import InputMask from 'react-input-mask'

function MaskedInput({ mask, id, name, placeholder, children, type, value, onChange, className }) {
    return (
        <div className='container-input-component'>
            <label
                htmlFor={id}
            >
                {children}
            </label>

            <InputMask
                className={className}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                mask={mask}
                maskChar=" "
            />
        </div>
    )
}

export default MaskedInput