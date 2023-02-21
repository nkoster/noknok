import { Text, StyleSheet } from 'react-native'

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
            <Text key={index} style={styles.codeBlock}>
              {item.split('\n').slice(1).join('\n')}
            </Text>
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
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    padding: 8
  }
})
