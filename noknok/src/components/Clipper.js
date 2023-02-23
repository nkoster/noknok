import React from 'react'
import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'

function Clipper({ data, color }) {

  const copyToClipboard = () => {
    Alert.alert(
      'Copied to clipboard',
      '',
      [
        {
          text: 'OK',
          onPress: async () => {
            try {
              await Clipboard.setStringAsync(data)
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
    <View style={styles.copyIcon}>
      <TouchableOpacity onPress={copyToClipboard}>
        <Ionicons
          name='copy-outline'
          size={14}
          color={color} />
      </TouchableOpacity>
    </View>
  )
}

export default Clipper

const styles = StyleSheet.create({
  copyIcon: {
    position: 'absolute',
    top: 2,
    right: 2
  }
})
