const express = require('express')
const app = express()
const PORT = 4000 || process.env.PORT

app.use(express.static('build'))

const path = require('path')
const http = require('http').Server(express)
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
})

app.get('/', (req, res) => res.sendFile(__dirname + 'index.html' ))



const {addUser, getUsersInRoom, removeUser} = require('./users')



http.listen(PORT, () => {
    console.log('running on port 4000')
})

let newScore = 0



io.on('connection', (socket) => {
    console.log('connected user')

    socket.on('join', ({name, room}, callback) => {
        const {user} = addUser({id: socket.id, name, room})

        console.log(user)

        socket.join(user.room)

        io.to(user.room).emit('numOfUsers', getUsersInRoom(user.room).length)
        io.to(user.room).emit('nameOfUsers', getUsersInRoom(user.name))

        

        console.log('users',getUsersInRoom(user.room).length)

        


       const handleRender = async() => {

                setTimeout(() => {

                    if((getUsersInRoom(user.room).length) >= 1) {
                        setTimeout(() => {
                            io.to(user.room).emit('generatedNum', ([Math.floor(Math.random() * (100 - 10 + 1)) + 10, Math.floor(Math.random() * (15 - 10 + 1)) + 10, Math.floor(Math.random() * (10 - 3 + 1)) + 3]))
                            getUsers = getUsersInRoom(user.room)
                        }, 1000)
                        
                        
                    }


                }, 25)


            
          }

          handleRender()

          const winLose = () => {

                socket.emit('winner', true)
                socket.broadcast.emit('loser', true)

          }
          const final = () => {

                socket.emit('won', true)
                socket.broadcast.emit('lost', true)

          }

          const roundLost = () => {

            socket.emit('loser', true)
            socket.broadcast.emit('winner', true)
            io.to(user.room).emit('generatedNum', ([Math.floor(Math.random() * (100 - 10 + 1)) + 10, Math.floor(Math.random() * (15 - 10 + 1)) + 10, Math.floor(Math.random() * (10 - 3 + 1)) + 3]))


          }

          socket.on('score', async(score) => {

            if (score === 2 || getUsersInRoom(user.room) < 2 ) {
                console.log('user', getUsersInRoom(user.room))
                
                final()
            }
           
      })

      socket.on('lost', () => {
        roundLost()
    })

        

          

        

          socket.on('userWins', async() => {

            try {


                    winLose()

                    try {

                        io.to(user.room).emit('generatedNum', ([Math.floor(Math.random() * (100 - 10 + 1)) + 10, Math.floor(Math.random() * (15 - 10 + 1)) + 10, Math.floor(Math.random() * (10 - 3 + 1)) + 3]))
   
                    } catch (error) {
                        console.log(error)
                    }




                
            } catch (error) {
                console.log(error)
            }


            
          })


          

          

       

    })

    

    

    socket.on('disconnect', () => {
        removeUser(socket.id)
        console.log('user disconnect')
    })

})