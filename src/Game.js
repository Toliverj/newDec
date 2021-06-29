import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { socket } from './atoms'
import './styles.css'
import {useHistory} from 'react-router-dom'

const Game = () => {

    const [number, setNumber] = useState('Get Ready')
    const [firstNumber, setFirstNumber] = useState(0)
    const [secondNumber, setSecondNumber] = useState(0)
    let [score, setScore] = useState(0)

    const [numOfUsers, setNumOfUsers] = useState(0)
    const [loser, setLoser] = useState(false)
    const [winner, setWinner] = useState(false)
    const [roundLost, setRoundLost] = useState(false)
    const [roundWon, setRoundWon] = useState(false)
    const [won, setWon] = useState(false)
    const [lost, setLost] = useState(false)
    const [game, setGame] = useState(true)

    const history = useHistory()

    const connectedSocket = useRecoilValue(socket)

    useEffect(() => {
            if(number === 0) {
                    console.log('win')
                    connectedSocket.emit('userWins')
                    setScore(score + 1)
                    connectedSocket.emit('score', score)

         
                       

                    setRoundWon(false)
                   
            }
            else if (number < 0) {

                console.log('lost')
                    connectedSocket.emit('lost')

                    

            }
    }, [number, connectedSocket])
    

    connectedSocket.on('loser', (value) => {
        setLoser(value)

        setTimeout(() => {
            setLoser(false)
        }, 1000)
        console.log('loser',loser)
    })
    connectedSocket.on('winner', (value) => {
        setWinner(value)
        setTimeout(() => {
            setWinner(false)
        }, 1000)
        console.log('winner',winner)
    })

    useEffect(() => {

        connectedSocket.on('won', (value) => {
            setGame(false)
            setWon(value)
            setWinner(value)
            setLoser(!value)
            
        })
        connectedSocket.on('lost', (value) => {
            setGame(false)
            setLost(value)
            setWinner(!value)
            setLoser(value)
        })

    }, [])

    


   
    console.log(score)

   

    useEffect(() => {

        

            connectedSocket.on('generatedNum', (info) => {
                console.log(info)
                setNumber(info[0])
                setFirstNumber(info[1])
                setSecondNumber(info[2])
            })

           
    }, [])


   

    const decrement = (num) => {
        setNumber(number - num)
    }

    return (
        
        <div className = 'game'>


            {lost && <div><h1>You lost</h1><button onClick = {() => {window.location = '/'}}>Return Home</button></div>}
            {won && <div><h1>You won</h1><button onClick = {() => {window.location = '/'}}>Return Home</button></div>}



            {winner && <h1>Winner</h1>}
            {loser && <h1>Loser</h1>}

            {roundWon && <h1>Round Won!</h1>}

            {(!winner && !loser && game) &&
            <>
                    <h1>{number}</h1>
                
                <div>
                    <button className = 'game_button' disabled = {winner} onClick = {() => decrement(firstNumber)}>-{firstNumber}</button>
                    <button className = 'game_button' onClick = {() => decrement(secondNumber)}>-{secondNumber}</button>
                    <button className = 'game_button' onClick = {() => decrement(1)}>{-1}</button>
                </div>
            </>
                }


                

            
            
        </div>
    )
}

export default Game
