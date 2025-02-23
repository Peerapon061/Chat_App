import UsersController from '#controllers/users_controller' 
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'  
router.group(()=>{ 
    router.group(()=>{ 
        router.post('/login',[UsersController,'login']).as('users.login') 
        router.post('/register',[UsersController,'register']).as('users.register') 
    })
    router.group(()=>{ 
        router.get('/users',[UsersController,'list'])
        router.get('/users/:id',[UsersController,'listAllExceptUserById'])
        router.delete('/users/:id',[UsersController,'destroy'])  
        router.put('/users/:id',[UsersController,'update'])  

        router.get('/user/:id',[UsersController,'getSpecificUserById'])
    }).use(middleware.auth())
}).prefix('/api') 