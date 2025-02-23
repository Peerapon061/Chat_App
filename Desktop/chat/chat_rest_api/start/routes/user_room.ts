import UserRoomsController from '#controllers/user_rooms_controller'
import { middleware } from '#start/kernel' 
import router from '@adonisjs/core/services/router' 
router.group(()=>{ 
    router.group(()=>{ 
        router.get('/rooms',[UserRoomsController,'indexAll'])
        router.get('/room',[UserRoomsController,'index'])
        router.get('/room/:roomId',[UserRoomsController,'getMemberOfRoomId'])
        router.post('/room',[UserRoomsController,'createNewRoom'])
        router.delete('/room/:roomId',[UserRoomsController,'destroy']) 
    })
}).prefix('/api').use(middleware.auth())