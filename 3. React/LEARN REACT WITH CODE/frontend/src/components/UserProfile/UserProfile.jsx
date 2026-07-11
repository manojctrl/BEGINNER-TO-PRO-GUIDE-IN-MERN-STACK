import React from 'react'

const UserProfile = ({userData}) => {
  return (
    <div>
      <h4>User Profile</h4>
      <p>Name : {userData.name}</p>
      <p>Age : {userData.age}</p>

    </div>
  )
}

export default UserProfile
