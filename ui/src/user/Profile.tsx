import React from 'react'
import { useSelector } from 'react-redux'

const Profile = (): JSX.Element => {
  const userState = useSelector((state: any) => state.user)

  return (
    <p>{userState.name}</p>
  )
}

export default Profile
