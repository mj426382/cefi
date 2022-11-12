import React, { useEffect } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { UserActions } from '../state/user'

export const FetchDataComponent = (): JSX.Element => {
  const dispatch = useDispatch()
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')
  const token = localStorage.getItem('jwtToken')

  const fetchUserData = async (): Promise<void> => {
    if (token !== null) {
      console.log({ token })
      const userDataResponse = await Axios.get('http://localhost:3000/user/current', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      dispatch(UserActions.set(userDataResponse.data))
    } else if (username !== null && password !== null) {
      const tokenResponse = await Axios.post('http://localhost:3000/auth/login', {
        username,
        password
      })
      localStorage.setItem('jwtToken', tokenResponse.data.Authorization)
    }
  }

  useEffect(() => {
    console.log('fetched')
    void fetchUserData()
  }, [token, username, password])

  return (
    <></>
  )
}
