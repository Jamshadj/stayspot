const io = require('socket.io')(8000, {
    cors: {
        origin: "http:/localhost:3000"
    }
})
let activeUsers = []

io.on("connection", (socket) => {
    //add new user
    socket.on('new-user-add', (newUserId) => {
        if (activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        io.emit('get-Users', activeUsers)
    })
})