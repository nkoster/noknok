import React, { useContext, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../context/useAuthContext'

const LoginScreen = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { accessToken, login } = useContext(AuthContext)
  const navigation = useNavigation()

  const handleLogin = async () => {
    await login(username, password)
    if (accessToken) {
      navigation.navigate('Home')
      setError('')
    } else {
      setError('Gebruikersnaam of wachtwoord onjuist')
      setUsername('')
      setPassword('')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inloggen</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder='Gebruikersnaam'
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder='Wachtwoord'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={!username || !password}
      >
        <Text style={styles.buttonText}>Inloggen</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
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
