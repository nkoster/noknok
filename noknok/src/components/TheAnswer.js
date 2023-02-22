import { Text, StyleSheet, View } from 'react-native'

function TheAnswer({ data }) {

  // console.log('DATA', data)

  const regex = /```([\s\S]+?)```/g

  const codeBlocks = data.match(regex)

  console.log('CODE', codeBlocks)

  return (
    <Text>
      {data.split(regex).map((item, index) => {
        if (codeBlocks && codeBlocks.includes('```' + item + '```')) {
          console.log('CODE BLOCK', item.slice(1, -1))
          return (
            <View key={index} style={styles.codeBlock}>
              <Text style={styles.codeBlockText}>
                {item.split('\n').slice(1).join('\n')}
              </Text>
            </View>
          )
        } else {
          console.log('TEXT', item)
          return <Text key={index}>{item}</Text>
        }
      })}
    </Text>
  )
}

export default TheAnswer

const styles = StyleSheet.create({
  codeBlock: {
    // backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 8
  },
  codeBlockText: {
    fontFamily: 'Courier New',
    fontWeight: 'bold',
  }
})
