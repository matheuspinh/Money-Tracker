import './styles.css';

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getItem, removeItem } from '../../utils/localStorage'

import HomeMenuIcon from '../../assets/home-page-user-menu.png'
import EditIcon from '../../assets/edit-icon-header-user.png'
import ExitIcon from '../../assets/exit-icon-header-user.png'
import usePageMode from '../../hooks/usePageMode'

import api from '../../services/api'

function Header({ setShowModal, pageMode, userMenu, setUserMenu }) {
  const { userDataEdited, setUserDataEdited } = usePageMode();
  const navigateTo = useNavigate()
  const userString = getItem('user')
  const token = getItem('token')
  const userObject = JSON.parse(userString)
  const userNameSplit = (userObject.nome).split(' ')

  const handleOpenMenu = (e) => {
    e.stopPropagation()
    setUserMenu(!userMenu)
  }

  const handleLogOut = () => {
    removeItem('user')
    removeItem('token')
    navigateTo('/login')
  }

  const handleShowModal = async () => {
    setShowModal(true)
  }

  const handleReturnClientsList = () => {
    navigateTo('/clients')
  }

  useEffect(() => {
    const getUserData = async (token) => {
      try {
        const responseDataToBeEdited = await api.get('/usuario', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setUserDataEdited({
          name: responseDataToBeEdited.data.nome,
          email: responseDataToBeEdited.data.email,
          cpf: responseDataToBeEdited.data.cpf,
          telephone: responseDataToBeEdited.data.telefone,
          password: '',
          confirmationPassword: ''
        })
      } catch (error) {
      }
    }

    getUserData(token)
  }, []);

  return (
    <header className="principal-header">
      <div className="adjust-resolution-header">
        {
          pageMode === 'home' &&
          <h1 className="title-home">
            Resumo das Cobranças
          </h1>
        }
        {
          pageMode === 'clients' &&
          <h1 className="title-green">
            Clientes
          </h1>
        }
        {
          pageMode === 'single-client' &&
          <div className="single-client-header">
            <h1
              onClick={() => handleReturnClientsList()}
              className="title-green clients return-option-click">
              Clientes
            </h1>
            <h1 className="title-green gray-color">
              {'>'}
            </h1>
            <h1 className="title-green gray-color">
              Detalhes do Cliente
            </h1>
          </div>
        }
        {
          pageMode === 'charges' &&
          <h1 className="title-green">
            Cobranças
          </h1>
        }
        <div className="user-info-area">
          <div className="name-initials-area">
            <h2 className="initials-name">
              {userNameSplit[0][0]}{userNameSplit[1] && userNameSplit[(userNameSplit.length - 1)][0]}
            </h2>
          </div>
          <h3
            onClick={(e) => handleOpenMenu(e)}
            className="complete-first-name"
          >
            {userNameSplit[0]}
          </h3>
          <div className="home-page-menu">
            <img
              src={HomeMenuIcon}
              alt="Icone Botão Menu da Página Home"
              className="home-page-user-menu"
              onClick={(e) => handleOpenMenu(e)}
            />
            {
              userMenu &&
              <div className="open-menu-options">
                <button
                  className='user-icon-option'
                  onClick={handleShowModal}
                >
                  <img
                    className='option-user'
                    src={EditIcon}
                    alt="Icone para Editar Usuário" />
                  <h4 className="user-icon-option-description">
                    Editar
                  </h4>
                </button>
                <button className='user-icon-option'>
                  <img
                    className='option-user'
                    src={ExitIcon}
                    alt="Icone para Sair da Sessão"
                    onClick={handleLogOut}
                  />
                  <h4 className="user-icon-option-description">
                    Sair
                  </h4>
                </button>

              </div>
            }
          </div>
        </div>
      </div>
    </header>
  )
};

export default Header;