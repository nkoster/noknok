import React, { useContext, useRef, useState } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Button, Alert
} from 'react-native'
// import { WebView } from 'react-native-webview'
import { AuthContext } from '../context/useAuthContext'
import { gptchat } from '../api'
// import { parseMd } from '../util'

const HomeScreen = () => {

  const { accessToken, responses, logout, setResponses } = useContext(AuthContext)
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const flatListRef = useRef()

  const handleChangePrompt = (text) => {
    setPrompt(text)
  }

  const gptChat = () => {
    setLoading(true)
    gptchat(prompt, responses, accessToken)
      .then(response => {
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

  const clearData = () => {
    Alert.alert(
      'Are you sure?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => {
            setResponses([])
            setPrompt('')
          }
        }
      ],
      { cancelable: true }
    )
  }

  // const { width } = useWindowDimensions()

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.topButtons}>
        <Button title='Clear' onPress={clearData} />
        <Button title='Logout' onPress={logout} />
      </View>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          style={styles.flatList}
          data={responses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({ item }) => {
              return (
                <View>
                  <View style={styles.questionView}>
                    <Text style={styles.textQuestion}>{item.question}</Text>
                  </View>
                  <View style={styles.answerView}>
                    <Text style={styles.textAnswer}>{item.answer.replace(/^\n+/, '')}</Text>
                  </View>
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
        <View style={styles.bottomButtons}>
          <Button title={loading ? 'Standby...' : 'Submit'} onPress={gptChat} disabled={loading || prompt === ''} />
          {loading ? <ActivityIndicator size='small' color='silver' /> : null}
        </View>
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
    padding: 6
  },
  topButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 30
  },
  title: {
    fontSize: 24,
    marginBottom: 30
  },
  questionView: {
    backgroundColor: '#eee',
    padding: 10,
    marginTop: 20,
    marginBottom: -10,
    borderStyle: 'solid',
    borderRadius: 10
  },
  textQuestion: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  answerView: {
    padding: 10,
    marginTop: 20,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 10
  },
  textAnswer: {
    fontSize: 16
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
    padding: 10,
    marginBottom: 50,
    marginTop: 10,
    borderRadius: 5
  }
})

export default HomeScreen
