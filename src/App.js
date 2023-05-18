import React, { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import Register from './pages/auth/Register';
import Email from './pages/email/Email';
import EmailDetails from './pages/email/EmailDetails'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      if (location.pathname !== '/login' && location.pathname !== '/register') {
        navigate('/login')
      }
    }
  }, [navigate, location])


  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <Navigate to='/login' />
          }
        />
        <Route
          path='/login'
          element={
            <Suspense fallback={<div>Загрузка</div>}>
              <Auth />
            </Suspense>
          }
        />
        <Route
          path='/register'
          element={
            <Suspense fallback={<div>Загрузка</div>}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path='/emails'
          element={
            <Suspense fallback={<div>Загрузка</div>}>
              <Email />
            </Suspense>
          }
        />
        <Route
          path='/emails/:id'
          element={
            <Suspense fallback={<div>Загрузка</div>}>
              <EmailDetails />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;