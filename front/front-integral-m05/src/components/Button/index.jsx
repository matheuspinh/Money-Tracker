import './style.css'

function Button({ children, handleButton, type, width }) {
    if (!width) {
        width = 160
    }

    return (
        <button
            className='button-component'
            onClick={handleButton}
            type={type}
            style={{ width: `${width}px` }}
        >
            {children}
        </button>
    )
}

export default Button