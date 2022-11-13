import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { State } from '../state/type/state'

const Profile = (): JSX.Element => {
  const userState = useSelector((state: State) => state.user)

  return userState.username !== null
    ? (
      <>
        <p>{userState.username}</p>
        <p>{userState.phoneNumber}</p>
        <p>{userState.email}</p>
      </>
      )
    : <Navigate to='/login' />
}

export default Profile
