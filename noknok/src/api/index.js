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
  }).then(res => res.json()).catch(err => console.error('ERROR', err))
  if (response.choices){
    return response.choices[0].text
  }
  return null
}
