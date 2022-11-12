import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useState, useCallback, useEffect } from 'react'
import PasswordStrengthBar from 'react-password-strength-bar'
import ReCAPTCHA from 'react-google-recaptcha'
import { validateUsername, validatePassword, validatePhone, validateMail, validatePasswords, isStringNullOrEmpty, isAnyStringEmpty } from './validateRegister'
import Axios from 'axios'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

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
  const [isAcceptedCheckbox, setIsAcceptedCheckbox] = useState(false)

  useEffect(() => {
    if (!isAnyStringEmpty([username, password, passwordAgain, phone, mail, captchaToken]) && isAcceptedCheckbox) {
      setIsActiveButton(true)
    } else {
      setIsActiveButton(false)
    }
  }, [username, password, passwordAgain, phone, mail, captchaToken, isAcceptedCheckbox])

  const handleChangeUsername = async (username: string): Promise<void> => {
    setUsername(username)
    const response = await Axios.get<boolean>('http://localhost:3000/user/username-exists/' + username)

    if (response.data) {
      setUsernameError('User with this username exists')
    } else {
      setUsernameError(null)
    }
    setExistedUserError(null)
  }

  const handlePhoneNumberBlur = async (phoneNumber: string): Promise<void> => {
    const response = await Axios.get<boolean>('http://localhost:3000/user/phone-number-exists/' + phoneNumber)

    if (response.data) {
      setPhoneError('Phone number exists')
    } else {
      setPhoneError(null)
    }
  }

  const handleEmailBlur = async (email: string): Promise<void> => {
    const response = await Axios.get<boolean>('http://localhost:3000/user/email-exists/' + email)

    if (response.data) {
      setMailError('Email exists')
    } else {
      setMailError(null)
    }
  }

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
      try {
        await Axios.post('http://localhost:3000/auth/register', {
          username,
          password,
          phoneNumber: phone,
          email: mail,
          captchaToken
        })
        window.alert('User created')
        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
      } catch (e) {
        setExistedUserError('User with these coordinates exists')
      }
    }
  }, [username, password, passwordAgain, phone, mail])

  return (
    <>
      <div>
        <TextField
          style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginTop: '0.5vw', width: '20vw' }}
          error={!isStringNullOrEmpty(usernameError) || !isStringNullOrEmpty(existedUserError)}
          id='filled-error'
          label='Login'
          variant='filled'
          helperText={existedUserError ?? usernameError}
          value={username}
          onChange={(e) => void handleChangeUsername(e.target.value)}
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
          <PasswordStrengthBar password={password} style={{ marginRight: '35vw', marginTop: '1vw' }} />
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
          <PasswordStrengthBar password={passwordAgain} style={{ marginRight: '35vw', marginTop: '1vw' }} />
        </div>
        {/* <TextField
          style={{ justifyContent: 'center', margin: 'auto', display: 'flex', width: '20vw', marginTop: '1vw' }}
          error={!isStringNullOrEmpty(phoneError)}
          id='filled-error'
          label='Phone number'
          variant='filled'
          helperText={phoneError}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        /> */}
        <TextField
          style={{ justifyContent: 'center', margin: 'auto', display: 'flex', width: '20vw', marginTop: '1vw' }}
          error={!isStringNullOrEmpty(mailError)}
          id='filled-error'
          label='E-mail'
          variant='filled'
          helperText={mailError}
          value={mail}
          onBlur={(e) => void handleEmailBlur(e.target.value)}
          onChange={(e) => {
            setMailError(null)
            setMail(e.target.value)
          }}
        />
        <div
          style={{ justifyContent: 'center', margin: 'auto', display: 'flex', width: '24vw', marginTop: '1vw' }}
        >
          <PhoneInput
            placeholder='Enter phone number'
            inputClass='material'
            containerClass='bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal'
            value={phone}
            onBlur={(e) => void handlePhoneNumberBlur(e.target.value)}
            onChange={phone => {
              setPhoneError(null)
              setPhone(phone)
            }}
          />
        </div>
        <ReCAPTCHA
          style={{ justifyContent: 'center', margin: 'auto', display: 'flex', width: '20vw', marginTop: '1vw' }}
          sitekey='6LelLeMiAAAAAITsAnvxxULmIva0mBQB3fA49dwd'
          onChange={(token) => setCaptchaToken(token)}
        />
      </div>
      <FormControlLabel
        style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginTop: '2vw', width: '20vw' }}
        control={<Checkbox checked={isAcceptedCheckbox} onClick={() => setIsAcceptedCheckbox(prev => !prev)} />} label='I accept the CeFi rules'
      />
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
