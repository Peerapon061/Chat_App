import { defineConfig } from '@adonisjs/auth' 
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session' 
import type { InferAuthEvents, Authenticators } from '@adonisjs/auth/types' 
import { jwtGuard } from '@maximemrf/adonisjs-jwt/jwt_config' 
import { JwtGuardUser, BaseJwtContent } from '@maximemrf/adonisjs-jwt/types' 
import User from '#models/user' 
interface JwtContent extends BaseJwtContent { 
  username: string 
} 
const authConfig = defineConfig({ 
  default: 'jwt', 
  guards: { 
    web: sessionGuard({ 
      useRememberMeTokens: false, 
      provider: sessionUserProvider({ 
        model: () => import('#models/user') 
      }), 
    }), 
    jwt: jwtGuard({ 
      tokenExpiresIn: '12h', 
      useCookies: false, 
      provider: sessionUserProvider({ 
        model: () => import('#models/user'), 
      }), 
      content: (user: JwtGuardUser<User>): JwtContent=>({ 
          userId: user.getId(), 
          username: user.getOriginal().username, 
          role: user.getOriginal().role,
      }), 
    }), 
  }, 
}) 
export default authConfig 