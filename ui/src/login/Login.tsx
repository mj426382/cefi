import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { isAnyStringEmpty } from '../register/validateRegister'
import { validateUsername, validatePassword } from './validateLogin'
import { Navigate } from 'react-router'

const Login = (): JSX.Element => {
  const [username, setUsername] = useState < string >('')
  const [password, setPassword] = useState < string >('')
  const [usernameError, setUsernameError] = useState < string | null >(null)
  const [passwordError, setPasswordError] = useState < string | null >(null)
  const [isActiveButton, setIsActiveButton] = useState(false)
  const [isRegisterRedirect, setIsRegisterRedirect] = useState(false)
  const [isLoginSuccesfull, setIsLoginSuccesfull] = useState(false)

  useEffect(() => {
    if (!isAnyStringEmpty([username, password])) {
      setIsActiveButton(true)
    } else {
      setIsActiveButton(false)
    }
  }, [username, password])

  const handleLogIn = async (): Promise<void> => {
    if (validateUsername(username, setUsernameError) && validatePassword(password, setPasswordError)) {
      try {
        const tokenResponse = await Axios.post('http://localhost:3000/auth/login', {
          username,
          password
        })
        window.alert('Login succesfull')

        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
        localStorage.setItem('jwtToken', tokenResponse.data.Authorization)
        setIsLoginSuccesfull(true)
      } catch (e) {
        setPasswordError('Incorrect password')
      }
    }
  }

  const handleChangeUsername = async (username: string): Promise<void> => {
    setUsername(username)
    const response = await Axios.get<boolean>('http://localhost:3000/user/username-exists/' + username)

    if (response.data) {
      setUsernameError(null)
    } else {
      setUsernameError('User with this username does not exist')
    }
  }

  return (
    <>
      {isRegisterRedirect && <Navigate to='/register' />}
      {isLoginSuccesfull && <Navigate to='/' />}
      <div>
        <TextField
          style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginTop: '10vw', width: '20vw' }}
          error={usernameError !== null}
          label='Login'
          variant='filled'
          helperText={usernameError}
          value={username}
          onChange={(e: any) => {
            setUsernameError(null)
            setUsername(e.target.value)
          }}
          onBlur={(e) => { void handleChangeUsername(e.target.value) }}
        />
        <TextField
          style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginTop: 'auto', width: '20vw' }}
          error={passwordError !== null}
          label='Password'
          variant='filled'
          helperText={passwordError}
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginTop: 'auto' }}
        variant='outlined'
        onClick={() => setIsRegisterRedirect(true)}
      >I have not an account
      </Button>
      <Button
        disabled={!isActiveButton}
        style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginTop: 'auto', width: '10vw' }}
        variant='outlined'
        onClick={() => { void handleLogIn() }}
      >Login
      </Button>
    </>
  )
}

export default Login
