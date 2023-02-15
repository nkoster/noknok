import React, { useContext, useRef, useState } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Button
} from 'react-native'
// import { WebView } from 'react-native-webview'
import { AuthContext } from '../context/useAuthContext'
import { gptchat } from '../api'
import { parseMd } from '../util'

const HomeScreen = () => {

  const { accessToken, responses, logout, setResponses } = useContext(AuthContext)
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const flatListRef = useRef()

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
        logout()
      })
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Button title='Logout' onPress={logout} />
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          style={styles.flatList}
          data={responses}
          renderItem={
            ({ item }) => {
              console.log('item answer', parseMd(item.answer))
              return (
                <View>
                  <Text style={styles.textQuestion}>{item.question}</Text>
                  <Text style={styles.textAnswer}>{item.answer}</Text>
                  {/*<WebView*/}
                  {/*    style={{ width: '100%', height: 600, border: '1px solid black' }}*/}
                  {/*    originWhitelist={['*']}*/}
                  {/*    source={{ html: parseMd(item.answer) }} />*/}
                </View>
              )
            }
          }
          onContentSizeChange={() => flatListRef.current.scrollToEnd({
            animated: true,
            index: responses.length - 1,
            viewPosition: 1
          })}
          onLayout={() => flatListRef.current.scrollToEnd({
            animated: true,
            index: responses.length - 1,
            viewPosition: 1
          })}
        />
        <TextInput
          placeholder='Type here...'
          onChangeText={handleChangePrompt}
          value={prompt}
          style={styles.textInput}
        />
        {loading
          ? <View>
            <ActivityIndicator size='small' color='#0077cc' />
          </View>
          : <Button title='Submit' onPress={gptChat} disabled={prompt === ''} />}
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
  textQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  textAnswer: {
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
    width: '100%'
  },
  flatList: {
    width: '100%'
  },
  textInput: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingBottom: 50
  }
})

export default HomeScreen
