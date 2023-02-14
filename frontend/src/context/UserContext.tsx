import React, { createContext, useReducer, Dispatch } from 'react'
import { userReducer, UserType, UserActions } from './UserReducer'

const initialState = ''

const UserContext = createContext<{
  username: UserType
  userDispatch: Dispatch<UserActions>
}>({
  username: initialState,
  userDispatch: () => null
})

const mainReducer = (
  username: UserType,
  action: UserActions
) => (userReducer(username, action))

type ProviderProps = {
  children: React.ReactNode
}

const UserProvider = ({ children }: ProviderProps) => {

  const localUser = localStorage.getItem('AuthApp')

  let user: UserType = initialState

  if (localUser) {
    if (localUser.length > 2) {
      user = localUser
    }
  }

  const [username, userDispatch] = useReducer(mainReducer, user)

  return (
    <UserContext.Provider value={{ username, userDispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }
