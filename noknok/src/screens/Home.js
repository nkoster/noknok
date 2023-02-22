import React, { useContext, useRef, useState } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Button, Alert, TouchableOpacity
} from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { AuthContext } from '../context/useAuthContext'
import { gptchat } from '../api'
import { Ionicons } from '@expo/vector-icons'
import TheAnswer from '../components/TheAnswer'

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
        const rgb = `rgb(${
          Math.floor(Math.random() * 80 + 170)}, ${
          Math.floor(Math.random() * 80 + 170)}, ${
          Math.floor(Math.random() * 80 + 170)})`
        newResponses.push({ question: prompt, answer: response, rgb })
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

  return (
    <KeyboardAvoidingView
      style={styles.containerOutside}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.topButtons}>
        <Button title='Clear' onPress={clearData} />
        <Button title='Logout' onPress={logout} />
      </View>
      <FlatList
        ref={flatListRef}
        style={styles.flatList}
        data={responses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={
          ({ item }) => {
            const styles = StyleSheet.create({
              questionView: {
                backgroundColor: item.rgb,
                padding: 14,
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
                position: 'relative',
                padding: 14,
                marginTop: 20,
                marginBottom: 13,
                borderWidth: 1,
                borderColor: item.rgb,
                borderStyle: 'solid',
                borderRadius: 10,
                backgroundColor: '#fff'
              },
              textAnswer: {
                fontSize: 16
              },
              copyIcon: {
                position: 'absolute',
                top: 3,
                right: 3
              }
            })

            const copyToClipboard = () => {
              Alert.alert(
                'Copied to clipboard',
                '',
                [
                  {
                    text: 'OK',
                    onPress: async () => {
                      try {
                        await Clipboard.setStringAsync(item.answer.replace(/^[\n?]+/, '').trim())
                      } catch (error) {
                        console.log(error)
                      }
                    }
                  }
                ],
                { cancelable: true }
              )
            }

            return (
              <View>
                <View style={styles.questionView}>
                  <Text style={styles.textQuestion}>{item.question}</Text>
                </View>
                <View style={styles.answerView}>
                  <TheAnswer data={item.answer.replace(/^[\n?]+/, '')} />
                  <View style={styles.copyIcon}>
                    <TouchableOpacity onPress={copyToClipboard}>
                      <Ionicons
                        name='copy-outline'
                        size={16}
                        color={'silver'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          }
        }
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({
          animated: true,
          index: responses.length - 1,
          viewPosition: 1
        })}
        onLayout={() => flatListRef.current?.scrollToEnd({
          animated: true,
          index: responses.length - 1,
          viewPosition: 1
        })}
      />
      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <View style={styles.inputText}>
            <TextInput
              placeholder='Type here...'
              onChangeText={handleChangePrompt}
              value={prompt}
            />
          </View>
          <TouchableOpacity
            disabled={loading || prompt === ''}
            onPress={gptChat}
          >
            {loading
              ? <ActivityIndicator size='small' color='silver' />
              : <Ionicons
                name='md-paper-plane'
                size={24}
                color={prompt ? 'black' : 'silver'} />}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  containerOutside: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    padding: 10
  },
  containerInside: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  copyPaste: {
    textAlign: 'right'
  },
  inputContainer: {
    padding: 0
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10,
    marginBottom: 90,
    marginTop: 10,
    borderRadius: 10
  },
  inputText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '93%'
  },
  submitButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default HomeScreen
