import React, { useEffect, useState } from 'react'
import UsersList from '../compnonents/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'
import './Users.css'

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedUsers, setLoadedUsers] = useState()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/users',
        )

        setLoadedUsers(responseData.users)
      } catch (err) {}
    }
    fetchUsers()
  }, [sendRequest])

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && (
        <>
          <section className='hero'>
            <h2>Explore Places Around the World</h2>

            <p className='hero-subtitle'>
              Discover destinations shared by travelers and explorers.
            </p>

            <div className='hero-stats'>
              {' '}
              Join {loadedUsers.length} Explorers
            </div>
          </section>

          <UsersList items={loadedUsers} />
        </>
      )}
    </React.Fragment>
  )
}

export default Users
