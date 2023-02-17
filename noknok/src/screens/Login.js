import React, { useContext, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../context/useAuthContext'
import { Ionicons } from '@expo/vector-icons'

const LoginScreen = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { accessToken, login } = useContext(AuthContext)
  const navigation = useNavigation()

  const handleLogin = async () => {
    await login(username, password)
    if (accessToken) {
      setError('')
      navigation.navigate('Home')
    } else {
      setUsername('')
      setPassword('')
      setTimeout(() => setError('Username or password is incorrect'), 500)
    }
  }

  return (
    <View style={styles.container}>
      <Ionicons name='walk-outline' size={128} color='silver' style={{ marginBottom: 50 }} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title='sign in'
        onPress={handleLogin}
        disabled={!username || !password}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    width: '100%',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 30
  },
  error: {
    color: 'red',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%'
  },
  button: {
    backgroundColor: '#0077cc',
    borderRadius: 5,
    padding: 10,
    width: '100%'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  }
})

export default LoginScreen
