import './style.css'
import SearchMagnifier from '../../assets/search-magnifier.svg'

function SearchInput({ placeholder, onChange }) {

    return (
        <div className='container-search-component'>
            <input
                onChange={(e) => onChange(e)}
                placeholder={placeholder}
            />

            <img className='search-component-magnifier' src={SearchMagnifier}></img>
        </div>
    )
}

export default SearchInput