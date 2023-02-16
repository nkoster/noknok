export async function gptchat(prompt, responses, accessToken) {
  const response = await fetch('http://192.168.2.17:3011/gptchat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify({
      prompt,
      responses
    })
  }).then(res => {
    try {
      return res.json()
    } catch (error) {
      return null
    }
  })
  if (response?.choices){
    return response.choices[0].text
  }
  return null
}
