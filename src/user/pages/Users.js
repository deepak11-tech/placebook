import React from 'react'
import UsersList from '../compnonents/UsersList'

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Deepak',
      image:
        'https://images.unsplash.com/photo-1555421689-43cad7100750?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      places: 3,
    },
  ]

  return <UsersList items={USERS} />
}

export default Users
