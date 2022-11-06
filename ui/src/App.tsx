import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FetchDataComponent } from './data/FetchDataComponent'
import Header from './header/Header'
import LendingPage from './lending/LendingPage'
import Login from './login/Login'
import Register from './register/Register'
import Profile from './user/Profile'

const App = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <FetchDataComponent />
        <Routes>
          <Route path='/' element={<LendingPage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
