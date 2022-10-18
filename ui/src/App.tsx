import React, { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './header/Header';
import LendingPage from './lending/LendingPage';
import Login from './login/Login';
import Register from './register/Register';

const App = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route path="/" element={<LendingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </>
  )
}

export default App;
