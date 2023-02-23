import { Text, StyleSheet, View } from 'react-native'
import Clipper from './Clipper'

function TheAnswer({ data }) {

  console.log('DATA', data)

  const regexCode = /`([\s\S]+?)`/g
  const codes = data.match(regexCode)
  const regexCodeBlock = /```([\s\S]+?)```/g
  const codeBlocks = data.match(regexCodeBlock)
  const regexBold = /\*\*([\s\S]+?)\*\*/g
  const bolds = data.match(regexBold)

  // console.log('CODE', codeBlocks)

  return (
    <Text>
      {data.split(regexCodeBlock).map((item, index) => {
        if (codeBlocks && codeBlocks.includes('```' + item + '```')) {
          const code = item.split('\n').slice(1).join('\n').trim()
          console.log('CODE BLOCK', code)
          return (
            <View key={index} style={styles.codeBlock}>
              <Text style={styles.codeBlockText}>
                {code}
              </Text>
              <Clipper data={code} color={'#666'} />
            </View>
          )
        } else {
          if (item.length > 0) {
            return <Text key={index}>{item.split().map((item, index) => {
              if (item.match(regexCode)) {
                const code = item.split('`')[1]
                console.log('CODEE', code)
                return (
                  <Text key={index} style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>
                    {code}
                  </Text>
                )
              } else {
                return <Text key={index}>{item}</Text>
              }
            })}</Text>
          }
        }
      })}
    </Text>
  )
}

export default TheAnswer

const styles = StyleSheet.create({
  codeBlock: {
    backgroundColor: '#fafafa',
    borderRadius: 3,
    width: '100%',
    padding: 8,
    paddingRight: 30,
  },
  codeBlockText: {
    fontFamily: 'Courier New',
    fontWeight: 'bold',
  }
})
