import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import {socket} from './atoms'
import { useHistory } from 'react-router-dom'

// http://192.168.0.221:3000

const Home = () => {

  

  const connectedSocket = useRecoilValue(socket)

  const history = useHistory()

  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [numOfUsers, setNumOfUsers] = useState(0)
  const [loading, setLoading] = useState('')

  useEffect(() => {
    console.log(connectedSocket)
  }, [connectedSocket])

  useEffect(() => {

    connectedSocket.on('numOfUsers', (info) => {
        console.log(info)
    })

}, [])

  const joinGame = () => {
      setLoading('Waiting for other users...')
    connectedSocket.emit('join', {name, room})
  }

  useEffect(() => {
    connectedSocket.on('numOfUsers', (info) => {
      setNumOfUsers(info)
    })
        if(numOfUsers === 2) {
            
            history.push(`/game/${room}`)
        }
        

        connectedSocket.emit('randomNumber')
    
  }, [numOfUsers])

  



  return (

    <div className = 'home'>
      <h1>Enter Game</h1>
      <div>
        <input
          placeholder = "Enter name"
          value = {name}
          onChange = {(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder = "Enter room"
          value = {room}
          onChange = {(e) => setRoom(e.target.value)}
        />
      </div>
      <div>
        <button onClick = {joinGame}>Start</button>
      </div>

      <div>
          {loading}
      </div>
    </div>
  )
}

export default Home
