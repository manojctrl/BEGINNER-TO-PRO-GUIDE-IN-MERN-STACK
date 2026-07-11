import React from 'react'
import UserProfile from '../UserProfile/UserProfile'

const Error = () => {
    const userData = {
        name : "Manoj Katuwal",
        age : 25
    }
  return (

    <div>
        <UserProfile  userData={userData}/>
      
    </div>
  )
}

export default Error
