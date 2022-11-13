import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { State } from '../state/type/state'

const Profile = (): JSX.Element => {
  const userState = useSelector((state: State) => state.user)

  return userState.username !== null
    ? (
      <div>
        <p>{userState.username}</p>
        <br />
        <p>{userState.phoneNumber}</p>
        <br />
        <p>{userState.email}</p>
        <br />
        {userState.balances.map((balance) => <>{`${balance.currency.name}: ${balance.balance}`}</>)}
      </div>
      )
    : <Navigate to='/login' />
}

export default Profile
