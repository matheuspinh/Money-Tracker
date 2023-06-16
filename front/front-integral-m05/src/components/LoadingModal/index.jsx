import './style.css'

function LoadingModal() {

    return (
        <div className="modal-loading-background">
            <div className="modal-content-loading">
                <div class="loader"></div>
                <span>Carregando</span>
            </div>
        </div >
    )
}


export default LoadingModal