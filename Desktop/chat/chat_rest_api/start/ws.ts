import app from '@adonisjs/core/services/app'
import Ws from '#services/Ws'
import Message from '#models/message'
import fs from 'fs'
import path from 'path'

app.ready(() => {
  Ws.boot()
  const io = Ws.io
  io?.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('disconnect',()=>{
      console.log('user disconnected')
    })
    socket.on('joinRoom',(roomId)=>{
      socket.join(roomId);
    })
    socket.on('chat message', async(data) => {
      const message = new Message()
      if(data.type==="image"){
        // const dir = process.cwd()
        const base64Data = data.message.split(',')[1];
        const urlPath = path.join('uploads', `image_${Date.now()}.png`).replace(/\\/g, '/');;
        const imagePath = path.join('public',urlPath);;
        message.senderId=data.senderId
        message.roomId=data.roomId
        try {
          fs.writeFileSync(imagePath, base64Data, 'base64');
          console.log(`Image saved at ${imagePath}`);
          message.senderId = data.senderId
          message.roomId = data.roomId
          message.message = urlPath
          message.type = data.type
          console.log(urlPath)

          await message.save()
          await message.load('userDetail')

          // Broadcast the message with the image path to the room
          io.in(data.roomId).emit('chat message', {
            message: urlPath, // Send image path to clients
            sender: data.senderId,
            userDetail: message.userDetail,
            type: data.type
          })
        } catch (error) {
          console.error('Error saving image:', error);
        }
      }
      else{
        message.senderId=data.senderId
        message.roomId=data.roomId
        message.message=data.message
        message.type=data.type
        await message.save()
        await message.load('userDetail')
        io.in(data.roomId).emit('chat message', {message:data.message,sender:data.senderId,userDetail:message.userDetail,type:data.type});
      }
    });
  })
})

