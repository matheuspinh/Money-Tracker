import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import FilterIcon from '../../assets/filter-icon.svg'
import ChargeIcon from '../../assets/paper-sheet-icon-tools-bar-unselected.png'
import ChargesFilter from '../../components/ChargesFilter'
import ChargesTable from '../../components/ChargesTable'
import FeedbackBoxMessage from '../../components/FeedbackBoxMessage'
import Header from '../../components/Header'
import ModalChargeDetails from '../../components/ModalChargeDetails'
import ModalDeleteCharge from '../../components/ModalDeleteCharge'
import ModalEditCharge from '../../components/ModalEditCharge'
import ModalEditUser from '../../components/ModalEditUser'
import SearchInput from '../../components/SearchInput'
import ToolsBar from '../../components/ToolsBar'
import useChargesList from '../../hooks/useChargesList'
import usePageMode from '../../hooks/usePageMode'
import api from '../../services/api'
import './styles.css'
import LoadingModal from '../../components/LoadingModal'

function Clients() {
    const [showUserModal, setShowUserModal] = useState(false)
    const [userMenu, setUserMenu] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [searchMode, setSearchMode] = useState(false)
    const [searchList, setSearchList] = useState([])
    const [showSucessDeleteCharge, setShowSucessDeleteCharge] = useState(false)
    const [showFailDeleteCharge, setShowFailDeleteCharge] = useState(false)
    const [showSucessEditCharge, setShowSucessEditCharge] = useState(false)
    const [filterModal, setFilterModal] = useState(false)
    const [atualPage, setAtualPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const filterParams = searchParams.get('status')
    const [filters, setFilters] = useState({
        date: '',
        status: filterParams
    })
    const filterRef = useRef()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {
        showModalEditCharge,
        showModalChargesDetails,
        showModalDeleteCharge } = usePageMode()
    const {
        chargesList,
        setChargesList,
        listChargesPayed,
        listChargesPredicted,
        listChargesExpired } = useChargesList()

    const handleOpenSucessDeleteCharge = () => {
        setTimeout(() => {
            setShowSucessDeleteCharge(true)
        }, 1000);
    }
    const handleCloseSucessDeleteCharge = () => {
        setShowSucessDeleteCharge(false)
    }

    const handleOpenFailDeleteCharge = () => {
        setShowFailDeleteCharge(true)
    }
    const handleCloseFailDeleteCharge = () => {
        setShowFailDeleteCharge(false)
    }

    const handleOpenSucessEditCharge = () => {
        setTimeout(() => {
            setShowSucessEditCharge(true)
        }, 1000);
    }
    const handleCloseSucessEditCharge = () => {
        setShowSucessEditCharge(false)
    }

    const resetPage = () => {
        searchParams.delete('status', 'date')
        setSearchParams(searchParams)
        setFilters({})
        getChargesList()
        return
    }

    const handleOpenFilter = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setFilterModal(!filterModal)
    }

    const getChargesList = async () => {
        try {
            setIsLoading(true)
            const responseGetList = await api.get('/cobranca', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const listOfCharges = responseGetList.data
            setChargesList(listOfCharges)

        } catch (err) {

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (filters.status) {
            if (filters.status === 'payed' && !filters.date) {
                setChargesList(listChargesPayed)
                if (!listChargesPayed.length) {
                    resetPage()
                }
            }
            if (filters.status === 'planned' && !filters.date) {
                setChargesList(listChargesPredicted)
                if (!listChargesPredicted.length) {
                    resetPage()
                }
            }
            if (filters.status === 'expired' && !filters.date) {
                setChargesList(listChargesExpired)
                if (!listChargesExpired.length) {
                    resetPage()
                }
            }
        } if (filters.status && filters.date === null || !filters.status && !filters.date) {
            resetPage()
        }
    }, [searchParams])

    useEffect(() => {
        if (filters.status || filters.date) {
            return
        }
        if (!chargesList.length) {
            resetPage()
        }
    }, [chargesList])

    const handleSearchCharges = (e) => {
        setAtualPage(1)
        let newSearch = [...chargesList]

        const searchText = e.target.value

        if (searchText.length > 0) {
            setSearchMode(true)
        } else {
            setSearchMode(false)
        }

        newSearch = newSearch.filter((client) =>
            client.nome.toLowerCase().startsWith(searchText.toLowerCase()) ||
            String(client.id).startsWith(searchText))

        setSearchList(newSearch)
    };

    return (
        <>
            <div className="charges-container">
                <ToolsBar
                    pageMode={'charges'}
                />
                <div className="charges-page-content">
                    <Header
                        pageMode={'charges'}
                        setShowModal={setShowUserModal}
                        userMenu={userMenu}
                        setUserMenu={setUserMenu}
                    />
                    <div className='charges-title-bar'>
                        <div className='charges-title-message'>
                            <img src={ChargeIcon} alt='Icone página de cobranças'>
                            </img>
                            <h2>Cobranças</h2>
                        </div>
                        <div className='charges-filter-bar'>
                            <img ref={filterRef} onClick={(e) => handleOpenFilter(e)} className='filter-icon' src={FilterIcon}
                            />
                            <SearchInput
                                placeholder={'Pesquisa'}
                                onChange={handleSearchCharges}
                            />
                        </div>

                    </div>
                    <ChargesTable
                        chargesList={searchMode ? searchList : chargesList}
                        searchMode={searchMode}
                        atualPage={atualPage}
                        setAtualPage={setAtualPage}
                    />
                </div>
            </div>
            {
                showUserModal &&
                <ModalEditUser
                    setShowUserModal={setShowUserModal}
                />
            }
            {
                showModalChargesDetails &&
                <ModalChargeDetails />
            }
            {
                showModalEditCharge &&
                <ModalEditCharge
                    handleOpenSucessEditCharge={handleOpenSucessEditCharge}
                />
            }
            {
                filterModal &&
                <ChargesFilter
                    handleOpenFilter={handleOpenFilter}
                    posRef={filterRef}
                    filters={filters}
                    setFilters={setFilters}
                    atualPage={atualPage}
                    setAtualPage={setAtualPage}
                />
            }
            {
                showModalDeleteCharge &&
                <ModalDeleteCharge
                    handleOpenSucessDeleteCharge={handleOpenSucessDeleteCharge}
                    handleOpenFailDeleteCharge={handleOpenFailDeleteCharge}
                />
            }

            {
                showSucessDeleteCharge &&
                <FeedbackBoxMessage
                    handleCloseFeedback={handleCloseSucessDeleteCharge}
                >
                    Cobrança excluída com sucesso!
                </FeedbackBoxMessage>
            }
            {
                showFailDeleteCharge &&
                <FeedbackBoxMessage
                    type={'fail'}
                    handleCloseFeedback={handleCloseFailDeleteCharge}
                >
                    Esta cobrança não pode ser excluída!
                </FeedbackBoxMessage>
            }
            {
                showSucessEditCharge &&
                <FeedbackBoxMessage
                    handleCloseFeedback={handleCloseSucessEditCharge}
                >
                    Cobrança editada com sucesso!
                </FeedbackBoxMessage>
            }
            {
                isLoading && <LoadingModal />
            }
        </>
    )
};

export default Clients;