import './styles.css';

import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import ClientsIcon from '../../assets/client-icon-tools-bar-unselected.png'
import FilterIcon from '../../assets/filter-icon.svg'
import Button from '../../components/Button'
import ClientModal from '../../components/ClientModal'
import ClientsTable from '../../components/ClientsTable'
import FeedbackBoxMessage from '../../components/FeedbackBoxMessage'
import Header from '../../components/Header'
import ModalEditUser from '../../components/ModalEditUser'
import ModalRegisterCharge from '../../components/ModalRegisterCharge'
import ToolsBar from '../../components/ToolsBar'
import usePageMode from '../../hooks/usePageMode'
import api from '../../services/api';
import { getItem } from '../../utils/localStorage';
import SearchInput from '../../components/SearchInput';
import ClientsFilter from '../../components/ClientsFilter';
import LoadingModal from '../../components/LoadingModal';

export default function Clients() {
    const { showRegisterChargeModal } = usePageMode()
    const { listClientWithChargesExpired, listClientWithChargesPayed, clientsList, setClientsList } = usePageMode()
    const [showUserModal, setShowUserModal] = useState(false)
    const [showClientFilter, setShowClientFilter] = useState(false)
    const [showNewClientModal, setShowNewClientModal] = useState(false)
    const [userMenu, setUserMenu] = useState(false)
    const [searchList, setSearchList] = useState([])
    const [searchMode, setSearchMode] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const filterRef = useRef()
    const [showFeedbackMessage, setShowFeedbackMessage] = useState(false)
    const [showSucessRegisterCharge, setShowSucessRegisterCharge] = useState(false)
    const [atualPage, setAtualPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const filterParams = searchParams.get('status')
    const [filter, setFilter] = useState({
        status: filterParams
    })

    async function getClientList() {

        const token = getItem('token');

        try {
            setIsLoading(true)
            const response = await api.get('/cliente', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data[0]) {
                setClientsList(response.data)
            }
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    const resetPage = () => {
        searchParams.delete('status')
        setSearchParams(searchParams)
        setFilter({})
        getClientList()
        return
    }

    const handleSearchClients = (e) => {
        setAtualPage(1)
        let newSearch = [...clientsList];

        const searchText = e.target.value;

        if (searchText.length > 0) {
            setSearchMode(true)
        } else {
            setSearchMode(false)
        }

        newSearch = newSearch.filter((client) =>
            client.nome.toLowerCase().startsWith(searchText.toLowerCase()) ||
            client.email.toLowerCase().startsWith(searchText.toLowerCase()) ||
            client.cpf.startsWith(searchText))

        setSearchList(newSearch)
    }

    const handleOpenFeedback = () => {
        const feedBackTimeout = setTimeout((() => { setShowFeedbackMessage(true) }), 1000)
        return
    }
    const handleCloseFeedback = () => {
        setShowFeedbackMessage(false)
        return
    }

    const handleOpenFilter = (e) => {
        e.preventDefault()
        setShowClientFilter(!showClientFilter)
    }

    const handleOpenSucessRegisterCharge = () => {
        setTimeout(() => {
            setShowSucessRegisterCharge(true)
        }, 1000);
    }
    const handleCloseSucessRegisterCharge = () => {
        return setShowSucessRegisterCharge(false)
    }

    const handleNewClientModal = () => {
        setShowNewClientModal(true)
        setUserMenu(false)
    }

    useEffect(() => {
        if (filter !== null) {
            if (filter === 'overdue') {
                setClientsList(listClientWithChargesExpired)
            } else if (filter === 'predicted') {
                setClientsList(listClientWithChargesPayed)
            }
            if (!filter.status) {
                setClientsList()
            }
        } else {
            setClientsList()
        }
    }, [filter])

    useEffect(() => {
        if (filter.status) {
            return
        }
        if (!clientsList || !clientsList.length) {
            resetPage()
        }
    }, [clientsList])

    useEffect(() => {
        if (filter.status) {
            if (filter.status === 'predicted') {
                setClientsList(listClientWithChargesPayed)
                if (!listClientWithChargesPayed.length) {
                    resetPage()
                }
            }
            if (filter.status === 'overdue') {
                setClientsList(listClientWithChargesExpired)
                if (!listClientWithChargesExpired.length) {
                    resetPage()
                }
            }
        }
    }, [searchParams])

    return (
        <>
            <div className="home-container">
                <ToolsBar
                    pageMode={'clients'}
                />
                <div className="home-page-content">
                    <Header
                        pageMode={'clients'}
                        setShowModal={setShowUserModal}
                        userMenu={userMenu}
                        setUserMenu={setUserMenu}
                    />
                    <div className='client-options-bar'>
                        <img className='client-icon' src={ClientsIcon}></img>
                        <h1>Clientes</h1>
                        <Button width={267} handleButton={handleNewClientModal}>+ Adicionar cliente</Button>
                        <img className='filter-icon' ref={filterRef} onClick={(e) => handleOpenFilter(e)} src={FilterIcon}></img>
                        <SearchInput onChange={handleSearchClients} placeholder={'Pesquisa'} />
                    </div>
                    <ClientsTable
                        clientsList={searchMode ? searchList : clientsList}
                        searchMode={searchMode}
                        atualPage={atualPage}
                        setAtualPage={setAtualPage}
                    />
                </div>
                {showFeedbackMessage &&
                    <FeedbackBoxMessage
                        handleCloseFeedback={handleCloseFeedback}
                    >
                        Cadastro concluído com sucesso
                    </FeedbackBoxMessage>
                }
                {showSucessRegisterCharge &&
                    <FeedbackBoxMessage
                        handleCloseFeedback={handleCloseSucessRegisterCharge}
                    >
                        Cobrança cadastrada com sucesso
                    </FeedbackBoxMessage>
                }

            </div>
            {showClientFilter && <ClientsFilter
                atualPage={atualPage}
                setAtualPage={setAtualPage}
                setFilters={setFilter}
                filters={filter}
                posRef={filterRef}
                handleOpenFilter={handleOpenFilter}
            />}
            {isLoading && <LoadingModal />}
            {showNewClientModal && <ClientModal handleOpenFeedback={() => handleOpenFeedback()} setShowNewClientModal={() => setShowNewClientModal()} />}
            {showUserModal && <ModalEditUser setShowUserModal={setShowUserModal} />}
            {showRegisterChargeModal && <ModalRegisterCharge handleOpenSucessRegisterCharge={handleOpenSucessRegisterCharge} />}
        </>
    )
};