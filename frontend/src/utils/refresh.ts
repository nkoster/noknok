import { Tokens } from '../types'

export const refresh = async (tokens: Tokens, callback: any) => {
  if (!tokens) return
  const res = await fetch('http://localhost:3011/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: tokens.refreshToken })
  })
    .then(r => r.json())
    .catch(err => {
      console.log(err.message)
    })
  const newTokens = { ...tokens, accessToken: res.accessToken }
  callback(newTokens)
  localStorage.setItem('localTokens', JSON.stringify(tokens))
}
