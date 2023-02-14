import React, { createContext, useReducer } from 'react'

const initialState = { accessToken: null, refreshToken: null }

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      }
    case 'LOGOUT':
      return {
        ...state,
        accessToken: null,
        refreshToken: null
      }
  }
  return state
}

export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState, () => initialState)

  const login = async (username, password) => {
    try {
      const response = await fetch('http://192.168.2.17:3011/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })

      const data = await response.json()
      if (response.ok) {
        console.log('Login successful.')
        dispatch({ type: 'LOGIN', payload: { accessToken: data.accessToken, refreshToken: data.refreshToken } })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
