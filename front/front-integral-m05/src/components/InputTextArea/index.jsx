import './style.css'

function InputTextArea({ id, name, placeholder, children, type, value, onChange, className }) {
    return (
        <div className='container-input-text-area-component'>
            <label
                htmlFor={id}
            >
                {children}
            </label>

            <textarea
                className={className}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows="4"
                cols="50"
            />
        </div>
    )
}

export default InputTextArea