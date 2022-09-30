import React from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const Home = ({ setUserName, userName }) => {
  const navigate = useNavigate()

  const loginHandler = (e) => {
    e.preventDefault()
    navigate(`/chat/${uuidv4()}`)
  }
  return (
    <div className="flex justify-center h-screen w-screen bg-slate-800 ">
      <div className="flex items-center">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="enter username"
          className="py-2"
        />
        <button
          type="submit"
          onClick={loginHandler}
          className="bg-blue-700 text-white px-3 py-2"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Home
