import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const Login = (): JSX.Element => {
  const [username, setUsername] = useState < string | null >(null)
  const [password, setPassword] = useState < string | null >(null)
  const [usernameError, setUsernameError] = useState < string | null >(null)
  const [passwordError, setPasswordError] = useState < string | null >(null)

  const handleLogIn = (): void => {

  }

  return (
    <>
      <div>
        <TextField
          style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginTop: '10vw', width: '20vw' }}
          error
          id='filled-error'
          label='Login'
          defaultValue='login'
          variant='filled'
          helperText='Incorrect entry.'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginTop: 'auto', width: '20vw' }}
          error
          id='filled-error'
          label='Password'
          defaultValue='password'
          variant='filled'
          helperText='Incorrect entry.'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginTop: 'auto', width: '10vw' }}
        variant='outlined'
        onClick={handleLogIn}
      >Login
      </Button>
    </>
  )
}

export default Login
