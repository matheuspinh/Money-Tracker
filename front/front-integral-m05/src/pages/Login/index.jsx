import './styles.css'
import { useState } from 'react'
import sideImage from '../../assets/laptop-plant.png'
import api from '../../services/api'
import hidePasswordImg from '../../assets/hide-password.svg'
import showPasswordImg from '../../assets/show-password.svg'
import { getItem, setItem } from '../../utils/localStorage'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import usePageMode from '../../hooks/usePageMode'

export default function LogIn() {
  const {
    setUserDataSignUp,
    setUserPassword,
    setAllowSignUpSucess } = usePageMode()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleOnChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value })
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleNavigateToSignUp = () => {
    setUserDataSignUp({ name: '', email: '' })
    setUserPassword({ password: '', passwordConfirmation: '' })
    setAllowSignUpSucess(false)
    navigate('/sign-up')
  }

  const validateMandatoryInputs = (field) => {
    if (!form[field]) {
      const updateErrorField = (latestState) => {
        return {
          ...latestState,
          [field]: 'O campo deve ser preenchido',
        }
      }
      setErrors(updateErrorField);
      return false
    } else {
      const updateErrorField = (latestSate) => {
        return {
          ...latestSate,
          [field]: ''
        }
      }
      setErrors(updateErrorField);
      return true
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    setErrors({
      email: '',
      password: ''
    })

    try {

      validateMandatoryInputs('email')
      validateMandatoryInputs('password')

      if (!form.email || !form.password) {
        return
      }

      const emailSecondPart = form.email.split('@')[1]
      if (!emailSecondPart.includes('.')) {
        setErrors({
          email: 'Preencha o campo de e-mail de maneira adequada.'
        });
        return
      }

      const response = await api.post('/login', {
        email: form.email,
        senha: form.password
      });

      const { token, user } = response.data;
      const { id, nome } = user
      const stringfiedUser = JSON.stringify({ id, nome })

      setItem('user', stringfiedUser)
      setItem('token', token);

      navigate('/home')

      return

    } catch (err) {
      setErrorMessage(err.response.data.mensagem)
      return
    }
  }

  useEffect(() => {
    const logged = getItem('token')

    if (logged) {
      navigate('/')
    };
  }, []);

  return (
    <div className='login-container'>
      <div className='left-container'>
        <div className='left-container-text'>
          <h1 className='image-text'>
            Gerencie todos os pagamentos da sua empresa em um só lugar.
          </h1>
        </div>
        <img src={sideImage} />
      </div>
      <div className='right-container'>
        <h2>
          Faça seu login!
        </h2>
        <form
          className='login-form'
          onSubmit={handleSubmit}
        >
          <label>
            E-mail
          </label>
          <input
            className={(errors.email || errorMessage) ? 'invalid' : undefined}
            name='email'
            placeholder='Digite seu email'
            type='email'
            value={form.email}
            onChange={handleOnChange}
          />
          <p
            className="error-message">
            {errors.email || errorMessage}
          </p>
          <div className='password-header'>
            <label>
              Senha
            </label>
            <a>
              Esqueceu a senha?
            </a>
          </div>
          <div className='password-input-container'>
            <input
              className={(errors.password || errorMessage) ? 'invalid' : undefined}
              name='password'
              placeholder='Digite sua senha'
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleOnChange}
            />
            <img
              onClick={handleShowPassword}
              src={showPassword ? showPasswordImg : hidePasswordImg}
              alt='Mostrar ou esconder senha'
              className='show-password-icon '
            />
          </div>
          <p
            className="error-message"
          >
            {errors.password || errorMessage}
          </p>
          <Button>
            Entrar
          </Button>
        </form>
        <p>
          Ainda não possui uma conta? <a onClick={handleNavigateToSignUp}> Cadastre-se</a>
        </p>
      </div>
    </div >
  )
}