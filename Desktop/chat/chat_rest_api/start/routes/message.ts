import MessagesController from '#controllers/messages_controller'
import { middleware } from '#start/kernel' 
import router from '@adonisjs/core/services/router' 
router.group(()=>{ 
    router.group(()=>{ 
        router.get('/messages/:roomId',[MessagesController,'listMessageByRoomId']) 
    })
}).prefix('/api').use(middleware.auth())