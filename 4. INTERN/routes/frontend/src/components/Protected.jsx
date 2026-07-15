import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Protected = ({user, allowedroles }) => {
    if(!user) {
        return <Navigate to="/login" replace/> }

        if(!allowedroutes.includes(user.role)){
            return <Navigate to ="/unauthorized" replace/>
        }
        
  return <Outlet />
    }
   

export default Protected
