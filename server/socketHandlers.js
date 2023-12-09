const Message = require('./models/Message');

const handleSocketConnection = (io) => {
  
  io.on('connection', async (socket) => {
    console.log('A user connected');

    try {
      // Load recent messages when a user connects
      const messages = await Message.find().exec();
      socket.emit('loadMessages', messages);

      // Handle incoming messages
      socket.on('sendMessage', async (data) => {
       
        const message = new Message(data);
        await message.save();
        io.emit('receiveMessage', data);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    } catch (error) {
      console.error('Error during socket connection:', error);
    }
  });
};

module.exports = { handleSocketConnection };
