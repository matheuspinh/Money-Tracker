import './styles.css'
import InputRadio from '../InputRadio'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { useSearchParams } from 'react-router-dom'
import usePageMode from '../../hooks/usePageMode'

export default function ClientsFilter({ handleOpenFilter, posRef, filters, setFilters, atualPage, setAtualPage }) {
  const token = localStorage.getItem('token')
  const [apply, setApply] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const { setClientsList, setListClientWithChargesExpired, setListClientWithChargesPayed } = usePageMode()

  const handleRadioInput = ({ target }) => {
    const status = target.value
    setFilters({
      status
    })
  }

  async function getFilteredClientList() {
    try {
      const response = await api.get('/cliente', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const listAllClients = response.data

      const clientsExpired = listAllClients.filter((client) => {
        return client.emDia === false;
      })

      const clientsPayed = listAllClients.filter((client) => {
        return client.emDia === true;
      })

      setListClientWithChargesExpired(clientsExpired)
      setListClientWithChargesPayed(clientsPayed)

      if (filters.status === 'overdue') {
        setClientsList(clientsExpired)
      }

      if (filters.status === 'predicted') {
        setClientsList(clientsPayed)
      }

      if (!filters.status) {
        setClientsList(listAllClients)
      }

    } catch (error) {
      return
    }
  }


  const handleApplyFilters = (e) => {
    if (!filters.date || !(filters.date).length) {
      const localFilters = filters
      delete localFilters.date
      setFilters(localFilters)
    }
    if (!filters.status || !(filters.status).length) {
      const localFilters = filters
      delete localFilters.status
      setFilters(localFilters)
    }
    setSearchParams(filters)
    getFilteredClientList()
    setApply(!apply)
    setAtualPage(1)
    handleOpenFilter(e)
    return
  }

  const handleClearFilters = (e) => {
    setFilters({})
    setSearchParams()
    setApply(!apply)
    setAtualPage(1)
    handleOpenFilter(e)
    return
  }

  useEffect(() => {
    getFilteredClientList()
  }, [apply])


  return (
    <div className='filter-component-container clients-filter' style=
      {{ top: (posRef.current.offsetTop + 55), left: (posRef.current.offsetLeft - 262) }}
    >
      <div className='filter-box-content'>
        <div className='radio-filter-box'>
          <span>Status</span>
          <InputRadio
            id='type-charge-paid'
            name='type-charge-filter'
            type='radio'
            value={'overdue'}
            onClick={handleRadioInput}
            isMarked={filters.status === 'overdue'}
          >Inadimplente</InputRadio>
          <InputRadio
            id='filter-type-predicted'
            name='type-charge-filter'
            type='radio'
            value={'predicted'}
            onClick={handleRadioInput}
            isMarked={filters.status === 'predicted'}
          >Em Dia</InputRadio>
        </div>
        <div className='filter-button-box'>
          <button className='filter-confirm-button' onClick={(e) => handleApplyFilters(e)}>Aplicar</button>
          <button className='filter-clear-button' onClick={(e) => handleClearFilters(e)}>Limpar</button>
        </div>
      </div>
    </div>
  )
}