import Message from '#models/message'
import type { HttpContext } from '@adonisjs/core/http'

export default class MessagesController {
    async listMessageByRoomId({params,response}:HttpContext){
        const roomId = params.roomId
        const messages = await Message.query().where("roomId",roomId).preload('userDetail')
        // const updatedMessages = messages.map((message) => {
        //     if (message.type === 'image') {
        //       const imageUrl = `http://localhost:3333/${message.message}`; // Adjust the URL according to your app's setup
        //       message.message = imageUrl;
        //     }
        //     return message;
        //   });
        // console.log(updatedMessages)
        //   Return the updated messages
        return response.ok(messages)
    }
}