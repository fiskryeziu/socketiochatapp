import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const Chat = ({ socket, userName }) => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const params = useParams()
  const divRef = useRef()

  const navigate = useNavigate()
  const userId = params.id

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg])
    })
  }, [messages, socket, divRef])

  const messageHandler = (e) => {
    e.preventDefault()
    socket.emit('chat message', {
      text: input,
      id: userId,
      name: userName,
      sockedId: socket.id,
    })
    setInput('')
    divRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  const exitHandler = () => {
    navigate('/')
  }
  return (
    <div className="flex justify-center item-center  h-screen w-screen bg-slate-800 relative">
      <div>
        <button
          className="rounded-full bg-red-600 absolute top-1 left-[50%] w-10 h-10 text-white text-bold"
          onClick={exitHandler}
        >
          X
        </button>
      </div>
      <div className="w-full px-5 flex flex-col justify-between ">
        <div className="flex flex-col mt-5 overflow-y-auto">
          {/* my message  */}
          {messages.map((message) =>
            message.id === userId ? (
              <div className="flex justify-end mb-4" key={uuidv4()}>
                <div className="mr-2 mb-4 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  {message.text}
                </div>
                <img
                  src="https://avatars.githubusercontent.com/u/64495368?v=4"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
              </div>
            ) : (
              <div className="flex justify-start mb-4" key={uuidv4()}>
                <div className="mr-2 mb-4 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  {message.text}
                </div>
                <img
                  src="https://avatars.githubusercontent.com/u/64495368?v=4"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
              </div>
            )
          )}
          <div ref={divRef} className="w-20 min-h-[50px]"></div>
        </div>
        <div className="py-5 relative">
          <input
            className="w-full bg-gray-300 py-5 px-3 rounded-xl"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type your message here..."
          />
          <button
            className={
              input.length > 0
                ? `absolute right-3  bg-green-700 w-10 h-10 top-8 rounded-full`
                : 'hidden'
            }
            onClick={messageHandler}
          >
            😀
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
