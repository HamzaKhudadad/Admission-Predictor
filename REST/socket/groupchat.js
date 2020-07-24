module.exports = function(io, Users){

    const users = new Users();

    io.on('connection', (socket) => {
// Add user to particular uni group
        socket.on('join', (params, callback) => {
            socket.join(params.room);

            users.AddUserData(socket.id, params.name, params.room);

            io.to(params.room).emit('usersList', users.GetUsersList(params.room));

            callback();
        });
        // js groupchat 49 create message and show in browser
        socket.on('createMessage', (message, callback) => {
          // send message to all users in room
            io.to(message.room).emit('newMessage', {
                text: message.text,
                room: message.room,
                from: message.sender,
                image: message.userPic
            });

            callback();
        });

        socket.on('disconnect', () => {
            var user = users.RemoveUser(socket.id);

            if(user){
                io.to(user.room).emit('usersList', users.GetUsersList(user.room));
            }
        })
    });
}
