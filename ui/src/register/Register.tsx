import { Button, TextField } from "@mui/material";
import React, { useState, useCallback } from "react";
import PasswordStrengthBar from 'react-password-strength-bar';
import { validateUsername, validatePassword, validatePhone, validateMail, validatePasswords } from './validateRegister';

const Register = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [passwordAgain, setPasswordAgain] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [mail, setMail] = useState<string | null>(null);

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordAgainError, setPasswordAgainError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [mailError, setMailError] = useState<string | null>(null);
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(null);

  const handleRegister = useCallback(() => {
    setUsernameError(null);
    setPasswordError(null);
    setPasswordAgainError(null);
    setPhoneError(null);
    setMailError(null);

    validateUsername(username, setUsernameError);
    validatePassword(password, setPasswordError);
    validatePassword(passwordAgain, setPasswordAgainError);
    validatePhone(phone, setPhoneError);
    validateMail(mail, setMailError);
    validatePasswords(password, passwordAgain, setPasswordMatchError);

    if(!usernameError && !passwordError && !passwordAgainError && !phoneError && !mailError) {
      
    }
  }, [username, password, passwordAgain, phone, mail]);

  return (
    <>
      <div>
        <TextField
          style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginTop: '5vw', width: '20vw'}}
          error={!!usernameError}
          id="filled-error"
          label="Login"
          variant="filled"
          helperText={usernameError}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div style={{display: 'flex', marginTop: '1vw'}}>
          <TextField
            style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginLeft: '40vw', width: '20vw'}}
            error={!!passwordError}
            id="filled-error"
            label="Password"
            variant="filled"
            helperText={passwordError}
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrengthBar password={password ?? ''} style={{marginRight: '35vw', marginTop: '1vw'}} />
        </div>
        <div style={{display: 'flex', marginTop: '1vw'}}>
          <TextField
            style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginLeft: '40vw', width: '20vw'}}
            error={!!passwordAgainError}
            id="filled-error"
            label="Password again"
            variant="filled"
            helperText={passwordAgainError}
            type='password'
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
          <PasswordStrengthBar password={passwordAgain ?? ''} style={{marginRight: '35vw', marginTop: '1vw'}} />
        </div>
        <TextField
          style={{ justifyContent: 'center', margin: 'auto', display: 'flex', width: '20vw', marginTop: '1vw'}}
          error={!!phoneError}
          id="filled-error"
          label="Phone number"
          variant="filled"
          helperText={phoneError}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          style={{ justifyContent: 'center', margin: 'auto', display: 'flex', width: '20vw', marginTop: '1vw'}}
          error={!!mailError}
          id="filled-error"
          label="E-mail"
          variant="filled"
          helperText={mailError}
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
      </div>
      <Button 
        style={{ justifyContent: 'center', margin: 'auto', display: 'flex', marginTop: '1vw', width: '10vw'}}
        variant="outlined"
        onClick={handleRegister}
      >Register</Button>
    </>
  );
};

export default Register;
