import { useRef, useEffect, useState, useContext } from 'react'
import { Button, TextField } from '@mui/material'
import { refresh } from '../utils/refresh'
import { Tokens } from '../types'
import { UserContext } from '../context/UserContext'

const TEN_MINUTES = 600000
const TEN_SECONDS = 10000

type MainProps = {
  tokens: Tokens,
  setTokens: (tokens: Tokens) => void
  inactive: {
    current: boolean
  }
}

const Main = ({ tokens, setTokens, inactive }: MainProps) => {

  const { username } = useContext(UserContext)
  const [testText, setTestText] = useState('')
  const active = useRef(false)
  const logoutTime = useRef(Date.now() + TEN_MINUTES)
  const interval = useRef()

  const logout = () => {
    localStorage.removeItem('localTokens')
    clearInterval(interval.current)
    setTokens(null)
  }

  useEffect(() => {
    // @ts-ignore
    interval.current = setInterval(() => {
      if (Date.now() > logoutTime.current) {
        console.log('Inactive, logging out')
        inactive.current = true
        logout()
      }
      if (active.current) {
        active.current = false
        logoutTime.current = Date.now() + TEN_MINUTES
        refresh(tokens, setTokens).catch(error => console.log(error.message))
      }
    }, TEN_SECONDS)
    return () => clearInterval(interval.current)
  }, [])

  const onChange = (evt: any) => {
    setTestText(evt.target.value)
    active.current = true
  }

  return (
    <div>
      <h3>Protected Page {username.toUpperCase()}</h3>
      <form>
        <TextField
          label='Protected Field'
          onChange={onChange}
        />
      </form>
      <p>{testText}</p>
      <Button
        color='primary'
        variant='outlined'
        component='span'
        onClick={logout}
        style={{ marginTop: '100px' }}
      >logout</Button>
    </div>
  )
}

export default Main
