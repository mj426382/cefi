import { Button, TextField } from '@mui/material'
import React, { useState, useCallback, useEffect } from 'react'
import PasswordStrengthBar from 'react-password-strength-bar'
import ReCAPTCHA from 'react-google-recaptcha'
import { validateUsername, validatePassword, validatePhone, validateMail, validatePasswords, isStringNullOrEmpty, isAnyStringEmpty } from './validateRegister'
import Axios from 'axios'

const Register = (): JSX.Element => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [phone, setPhone] = useState('')
  const [mail, setMail] = useState('')

  const [usernameError, setUsernameError] = useState < string | null >(null)
  const [passwordError, setPasswordError] = useState < string | null >(null)
  const [passwordAgainError, setPasswordAgainError] = useState < string | null >(null)
  const [phoneError, setPhoneError] = useState < string | null >(null)
  const [mailError, setMailError] = useState < string | null >(null)
  const [passwordMatchError, setPasswordMatchError] = useState < string | null >(null)
  const [isActiveButton, setIsActiveButton] = useState(false)

  const [existedUserError, setExistedUserError] = useState<string | null>(null)

  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  useEffect(() => {
    if (!isAnyStringEmpty([username, password, passwordAgain, phone, mail, captchaToken])) {
      setIsActiveButton(true)
    } else {
      setIsActiveButton(false)
    }
  }, [username, password, passwordAgain, phone, mail, captchaToken])

  const handleRegister = useCallback(async () => {
    setUsernameError(null)
    setPasswordError(null)
    setPasswordAgainError(null)
    setPhoneError(null)
    setMailError(null)
    setPasswordMatchError(null)

    if (validateUsername(username, setUsernameError) &&
    validatePassword(password, setPasswordError) &&
    validatePassword(passwordAgain, setPasswordAgainError) &&
    validatePhone(phone, setPhoneError) &&
    validateMail(mail, setMailError) &&
    validatePasswords(password, passwordAgain, setPasswordMatchError)) {
      const response = await Axios.post('http://localhost:8080/user', {
        name: username,
        password,
        phoneNumber: phone,
        email: mail
      })
      if (response.status !== 201) {
        setExistedUserError('User with these coordinates exists')
      }
    }
  }, [username, password, passwordAgain, phone, mail])

  return (
    <>
      <div>
        <TextField
          style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginTop: '2vw', width: '20vw' }}
          error={!isStringNullOrEmpty(usernameError) || !isStringNullOrEmpty(existedUserError)}
          id='filled-error'
          label='Login'
          variant='filled'
          helperText={existedUserError ?? usernameError}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div style={{ display: 'flex', marginTop: '1vw' }}>
          <TextField
            style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginLeft: '40vw', width: '20vw' }}
            error={!isStringNullOrEmpty(passwordError)}
            id='filled-error'
            label='Password'
            variant='filled'
            helperText={passwordError}
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrengthBar password={password ?? ''} style={{ marginRight: '35vw', marginTop: '1vw' }} />
        </div>
        <div style={{ display: 'flex', marginTop: '1vw' }}>
          <TextField
            style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginLeft: '40vw', width: '20vw' }}
            error={!isStringNullOrEmpty(passwordAgainError) || !isStringNullOrEmpty(passwordMatchError)}
            id='filled-error'
            label='Password again'
            variant='filled'
            helperText={passwordAgainError ?? passwordMatchError}
            type='password'
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
          <PasswordStrengthBar password={passwordAgain ?? ''} style={{ marginRight: '35vw', marginTop: '1vw' }} />
        </div>
        <TextField
          style={{ justifyContent: 'center', margin: 'auto', display: 'flex', width: '20vw', marginTop: '1vw' }}
          error={!isStringNullOrEmpty(phoneError)}
          id='filled-error'
          label='Phone number'
          variant='filled'
          helperText={phoneError}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          style={{ justifyContent: 'center', margin: 'auto', display: 'flex', width: '20vw', marginTop: '1vw' }}
          error={!isStringNullOrEmpty(mailError)}
          id='filled-error'
          label='E-mail'
          variant='filled'
          helperText={mailError}
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <ReCAPTCHA
          style={{ justifyContent: 'center', margin: 'auto', display: 'flex', width: '20vw', marginTop: '1vw' }}
          sitekey='6LelLeMiAAAAAITsAnvxxULmIva0mBQB3fA49dwd'
          onChange={(token) => setCaptchaToken(token)}
        />
      </div>
      <Button
        style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginTop: '1vw', width: '10vw' }}
        variant='outlined'
        onClick={handleRegister}
        disabled={!isActiveButton}
      >Register
      </Button>
    </>
  )
}

export default Register
