import Room from '#models/room'
import UserRoom from '#models/user_room'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserRoomsController {
    async indexAll({response}:HttpContext){
        const rooms = await Room.query()
        return response.ok(rooms)
    }
    async index({auth,response}:HttpContext){
        const user = auth.getUserOrFail()
        const rooms = await UserRoom.query()
                        .where('memberId',user.id)
                        .preload('roomDetail')
        return response.ok(rooms)
    }
    async getMemberOfRoomId({response,params}:HttpContext){
        const roomId = params.roomId
        const rooms = await UserRoom.query()
                        .where('roomId',roomId)
        return response.ok(rooms)
    }
    async createNewRoom({auth,response,request}:HttpContext){
        const {roomName,ChatParterId} = request.all()
        const user = auth.getUserOrFail()
        const newRoom = await Room.create({roomName:roomName})
        await UserRoom.create({roomId:newRoom.id,memberId:user.id})
        await UserRoom.create({roomId:newRoom.id,memberId:ChatParterId})
        return response.ok("Create completed")
    }

    async destroy({params}:HttpContext){
        const roomId = params.roomId
        const rooms = await UserRoom.query()
                        .where('roomId',roomId).preload('roomDetail')
        rooms.forEach((room)=>{
            room?.delete()
        })
        
        const roomDetail = await Room.query().where('id',roomId).first()
        roomDetail?.delete()
    }
}