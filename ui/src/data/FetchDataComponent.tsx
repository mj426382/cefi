import React, { useEffect } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { UserActions } from '../state/user'

export const FetchDataComponent = (): JSX.Element => {
  const dispatch = useDispatch()

  const fetchUserData = async (): Promise<void> => {
    const userDataResponse = await Axios.get('http://localhost:8080/user/1')
    dispatch(UserActions.set(userDataResponse.data))
  }

  useEffect(() => {
    void fetchUserData()
  }, [])

  return (
    <></>
  )
}
