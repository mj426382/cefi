export const validateUsername = (login: string | null, setUsernameError: (e: string) => void): boolean => {
  if (isStringNullOrEmpty(login)) {
    setUsernameError('Username can not be empty!')
    return false
  }
  return true
}

export const validatePassword = (password: string | null, setPasswordError: (e: string) => void): boolean => {
  if (isStringNullOrEmpty(password)) {
    setPasswordError('Password can not be empty!')
    return false
  }
  if ((password as string).length < 8) {
    setPasswordError('Password has to have at least 8 characters!')
    return false
  }
  return true
}

export const validatePhone = (phone: string | null, setPhoneError: (e: string) => void): boolean => {
  if (isStringNullOrEmpty(phone)) {
    setPhoneError('Phone number can not be empty!')
    return false
  }
  if (phone?.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/) == null) {
    setPhoneError('Phone is not valid phone number!')
    return false
  }
  return true
}

export const validateMail = (mail: string | null, setMailError: (e: string) => void): boolean => {
  if (isStringNullOrEmpty(mail)) {
    setMailError('Mail can not be empty!')
    return false
  }
  if (mail?.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ) == null) {
    setMailError('Mail is not valid email address!')
    return false
  }
  return true
}

export const validatePasswords = (password: string | null, passwordAgain: string | null, setPasswordsError: (e: string) => void): boolean => {
  if (password !== passwordAgain) {
    setPasswordsError('Passwords should match!')
    return false
  }
  return true
}

export const isStringNullOrEmpty = (str: string | null): boolean => str === null || str === ''

export const isAnyStringEmpty = (arr: Array<string | null>): boolean => arr.some(str => isStringNullOrEmpty(str))
