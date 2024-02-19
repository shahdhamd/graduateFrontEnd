import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes({loginData}) {
  return (
    <div>
      {loginData ? <Outlet /> : <Navigate to='/login' />}
    </div>
  )
}

export default ProtectedRoutes