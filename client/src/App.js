import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

let socket
const url = 'localhost:5000'
const App = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket = io(url)
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg])
    })
    console.log(messages)
    window.scrollTo(0, document.body.scrollHeight)
  }, [messages])

  const messageHandler = (e) => {
    e.preventDefault()
    socket.emit('chat message', input)
    setInput('')
  }
  return (
    <>
      <ul>
        {messages.map((message) => (
          <li key={message + Date.now()}>{message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" onClick={messageHandler}>
        Send
      </button>
    </>
  )
}

export default App
