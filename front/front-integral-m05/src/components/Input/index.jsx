import './style.css'


function Input({ id, name, placeholder, children, type, value, onChange, className, disabled, readOnly }) {

    return (
        <div className='container-input-component'>
            <label
                htmlFor={id}
            >
                {children}
            </label>

            <input
                className={className}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                readOnly={readOnly}
            />
        </div>
    )
}

export default Input