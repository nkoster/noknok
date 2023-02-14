import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { AuthContext } from '../context/useAuthContext'

const HomeScreen = () => {

  const { accessToken, logout } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welkom thuis!</Text>
      <Text style={styles.text}>Je bent momenteel ingelogd met token:</Text>
      <Text style={styles.token}>{accessToken}</Text>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Uitloggen</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 30
  },
  text: {
    fontSize: 16,
    marginBottom: 10
  },
  token: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20
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

export default HomeScreen
