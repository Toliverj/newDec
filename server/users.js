const users = []

const addUser = ({id, name, room}) => {
    const existingUser = users.find((user) => user.room === room && user.name === name)

    if(existingUser) {
        return {error: 'Username is taken'}
    }
    else {
        const user = {id, name, room}
        users.push(user)
        return {user}
    }
}

const removeUser = (id) => {
    const user = users.findIndex((user) => user.id === id)
     return users.splice(user, 1)[0]
}



const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room)
}

module.exports = {addUser, getUsersInRoom, removeUser}