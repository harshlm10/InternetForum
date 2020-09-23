const SocketConnection = (server) => {
    const io = require('socket.io')(server);
    const { adduser, removeuser, getuser, getuserinroom } = require('../users')
    io.on('connection', socket => {
        console.log('a new connection')
        socket.on('join', (data, callback) => {
            const { error, user } = adduser({ id: socket.id, name: data.CreatedBy, room: data.heading })
            if (error) { return callback(error) }
            socket.emit('message', { user: 'admin', text: `${user.name} Welcome to the topic discussion ${user.room}` })
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joind the topic` });
            socket.join(user.room);
            callback()
        })

        socket.on('sendmessage', (message, callback) => {
            const user = getuser(socket.id)
            io.to(user.room).emit('message', { user: user.name, text: message })
            callback();
        })

        socket.on('disconnect', () => {
            console.log('Disconnected!!')
        })
    })
}

module.exports = SocketConnection