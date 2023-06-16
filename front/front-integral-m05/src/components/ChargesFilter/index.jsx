import './styles.css'
import InputRadio from '../InputRadio'
import Input from '../Input'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { useSearchParams } from 'react-router-dom'
import useChargesList from '../../hooks/useChargesList'

export default function ChargesFilter({ handleOpenFilter, posRef, filters, setFilters, atualPage, setAtualPage }) {
  const token = localStorage.getItem('token')
  const dateISOFormatted = (date) => date.toISOString().split('T')[0]
  const [apply, setApply] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const { setChargesList, setListChargesPayed, setListChargesPredicted, setListChargesExpired } = useChargesList()

  const handleRadioInput = ({ target }) => {
    const status = target.value
    setFilters({
      ...filters,
      status
    })
  }
  const handleChangeDate = ({ target }) => {
    const date = target.value
    setFilters({
      ...filters,
      date
    })
  }


  const getFilteredChargesList = async () => {
    try {
      const response = await api.get('/cobranca', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      let localChargesList = await response.data
      setChargesList(localChargesList)

      const dateToday = dateISOFormatted(new Date())

      const localListChargesPayed = [];
      const localListChargesPredicted = [];
      const localListChargesExpired = [];

      localChargesList.map((charge) => {
        if (charge.pago === true) {
          localListChargesPayed.push(charge)
        }

        if (charge.vencimento.split('T')[0] >= dateToday && charge.pago === false) {
          localListChargesPredicted.push(charge)
        }

        if (charge.vencimento.split('T')[0] < dateToday && charge.pago === false) {
          localListChargesExpired.push(charge)
        }
      })

      setListChargesPayed(localListChargesPayed)
      setListChargesExpired(localListChargesExpired)
      setListChargesPredicted(localListChargesPredicted)

      if (!filters.status || filters.status === null) {
        setChargesList(localChargesList)
      }
      else if (filters.status === 'payed') {
        localChargesList = [...localListChargesPayed]
        setChargesList(localListChargesPayed)
      }
      else if (filters.status === 'expired') {
        localChargesList = [...localListChargesExpired]
        setChargesList(localListChargesExpired)
      }
      else if (filters.status === 'planned') {
        localChargesList = [...localListChargesPredicted]
        setChargesList(localListChargesPredicted)
      }
      if (filters.date !== '' && filters.date !== null && filters.date !== undefined) {
        const filterDate = dateISOFormatted(new Date(filters.date))
        const dateFilteredCharges = []

        localChargesList.map((charge) => {
          if (charge.vencimento.split('T')[0] === filterDate) {
            dateFilteredCharges.push(charge)
          }
        })
        setChargesList(dateFilteredCharges)
      }
    } catch (err) {
      return
    }
  }


  const handleApplyFilters = (e) => {
    e.stopPropagation()
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
    getFilteredChargesList()
    setApply(!apply)
    handleOpenFilter(e)
    setAtualPage(1)
    return
  }

  const handleClearFilters = (e) => {
    e.stopPropagation()
    setFilters({})
    setSearchParams()
    setApply(!apply)
    handleOpenFilter(e)
    setAtualPage(1)
    return
  }

  useEffect(() => {
    getFilteredChargesList()
  }, [apply])


  return (
    <div className='filter-component-container' style=
      {{ top: (posRef.current.offsetTop + 55), left: (posRef.current.offsetLeft - 262) }}
    >
      <div className='filter-box-content'>
        <div className='radio-filter-box'>
          <span>Status</span>
          <InputRadio
            id='type-charge-paid'
            name='type-charge-filter'
            type='radio'
            value={'payed'}
            onClick={handleRadioInput}
            isMarked={filters.status === 'payed'}
          >Paga</InputRadio>
          <InputRadio
            id='filter-type-predicted'
            name='type-charge-filter'
            type='radio'
            value={'planned'}
            onClick={handleRadioInput}
            isMarked={filters.status === 'planned'}
          >Pendente</InputRadio>
          <InputRadio
            id='filter-type-overdue'
            name='type-charge-filter'
            type='radio'
            value={'expired'}
            onClick={handleRadioInput}
            isMarked={filters.status === 'expired'}
          >Vencida</InputRadio>
        </div>
        <div className='filter-date-box'>
          <span>Data de Vencimento:</span>
          <Input
            id='expiration-register-charge'
            name='expiration'
            type='date'
            placeholder='Digite o vencimento'
            className={'date-filter-input'}
            onChange={handleChangeDate}
            value={filters.date}
          />
        </div>
        <div className='filter-button-box'>
          <button className='filter-confirm-button' onClick={(e) => handleApplyFilters(e)}>Aplicar</button>
          <button className='filter-clear-button' onClick={(e) => handleClearFilters(e)}>Limpar</button>
        </div>
      </div>
    </div>
  )
}