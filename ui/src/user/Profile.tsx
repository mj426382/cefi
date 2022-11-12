import React from 'react'
import { useSelector } from 'react-redux'

const Profile = (): JSX.Element => {
  const userState = useSelector((state: any) => state.user)

  return (
    <>
      <p>{userState.username}</p>
      <p>{userState.phoneNumber}</p>
      <p>{userState.email}</p>
    </>
  )
}

export default Profile
