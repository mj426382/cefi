export const validateUsername = (login: string | null, setUsernameError: (e: string) => void): boolean => {
  if (login === '') {
    setUsernameError('Username can not be empty!')
    return false
  }
  return true
}

export const validatePassword = (password: string | null, setPasswordError: (e: string) => void): boolean => {
  if (password === null || password === '') {
    setPasswordError('Password can not be empty!')
    return false
  }
  if (password?.length < 8) {
    setPasswordError('Password has to have at least 8 characters!')
    return false
  }
  return true
}
