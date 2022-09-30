import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './Chat'
import Home from './Home'
import io from 'socket.io-client'

const url = 'localhost:5000'
const socket = io(url)

const App = () => {
  const [userName, setUserName] = useState('')
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              socket={socket}
              userName={userName}
              setUserName={setUserName}
            />
          }
        />
        <Route
          path="/chat/:id"
          element={<Chat socket={socket} userName={userName} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
