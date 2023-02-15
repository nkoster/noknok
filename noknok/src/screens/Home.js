import React, { useContext, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TextInput, FlatList, KeyboardAvoidingView, Button }from 'react-native'
import { WebView } from 'react-native-webview'
import { AuthContext } from '../context/useAuthContext'
import { gptchat } from '../api'
import { parseMd } from '../util'

const HomeScreen = () => {

  const { accessToken, responses, logout, setResponses } = useContext(AuthContext)
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChangePrompt = (text) => {
    setPrompt(text)
  }

  const gptChat = () => {
    console.log('gptChat', prompt, responses)
    setLoading(true)
    gptchat(prompt, responses, accessToken)
      .then(response => {
        console.log('chatting...', responses, response)
        const newResponses = [...responses]
        newResponses.push({ question: prompt, answer: response })
        setPrompt('')
        setLoading(false)
        setResponses(newResponses)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Button title='Logout' onPress={logout} />
      <View style={styles.container}>
        <FlatList style={styles.flatList} data={responses} renderItem={
          ({ item }) => {
            console.log('item answer', parseMd(item.answer))
            return (
            <View style={styles.red}>
              <Text style={styles.text}>{item.question}</Text>
              <WebView
                  style={{ width: '100%', height: 600, border: '1px solid black' }}
                  originWhitelist={['*']}
                  source={{ html: parseMd(item.answer) }} />
            </View>
          )}
        } />
        <TextInput
          placeholder='Type here...'
          onChangeText={handleChangePrompt}
          value={prompt}
          style={{paddingBottom: 50, width: '100%'}}
        />
        {loading 
          ? <View>
              <ActivityIndicator size='small' color='#0077cc' />
          </View>
          : <Button title='Submit' onPress={gptChat} disabled={prompt === ''}/>}
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  },
  red: {
    backgroundColor: 'red',
    width: '100%',
  },
  flatList: {
    width: '100%',
  }
})

export default HomeScreen
