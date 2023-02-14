import { useContext, useState } from 'react'
import { Button, makeStyles, TextField } from '@mui/material'
import { Tokens } from '../types'
import { UserContext } from '../context/UserContext'
import { Types } from '../context/UserReducer'

type LoginProps = {
  setTokens: (tokens: Tokens) => void
  inactive: {
    current: boolean
  }
}

const Login = ({ setTokens, inactive }: LoginProps) => {

  const { userDispatch } = useContext(UserContext)

  const Error = () => {
    return <p>Login failure</p>
  }

  const Inactive = () => {
    inactive.current = false
    return <p>Logged out due to inactivity</p>
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(false)

  const onChangeUsername = (evt: any) => setUsername(evt.target.value)
  const onChangePassword = (evt: any) => setPassword(evt.target.value)

  const onLogin = (evt: any) => {
    evt.preventDefault()
    fetch('http://localhost:3011/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, password
      })
    })
      .then(res => res.json())
      .then(tokens => {
        if (!tokens.accessToken) {
          setErr(true)
          return
        }
        localStorage.setItem('localTokens', JSON.stringify(tokens))
        setTokens(tokens)
        userDispatch({type: Types.Update, payload: username })
        localStorage.setItem('AuthApp', username)
      })
      .catch(err => {
        console.log(err.message)
        setErr(true)
      })
  }

  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ fontSize: '16px', textAlign: 'center' }}>
        {err && <Error />}
        {inactive.current && !err && <Inactive />}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <form onSubmit={onLogin}>
          <div>
            <TextField
              type='text'
              name='username'
              label='Username'
              onChange={onChangeUsername}
            />
            <TextField
              type='password'
              name='password'
              label='Password'
              onChange={onChangePassword}
            />
            <Button
              color='primary'
              variant='outlined'
              type='submit'
              disabled={username.length < 1 || password.length < 1 && true}
            >Login</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// const styles = makeStyles({
//   root: {
//     borderRadius: 3,
//     margin: '10px'
//   },
//   box: {
//     marginTop: '100px',
//     maxWidth: '700px',
//     display: 'flex',
//     alignItems: 'baseline'
//   }
// })

export default Login


