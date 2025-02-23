import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import Role from '../../contact/Role.js'
export default class AdminBasePolicy extends BasePolicy { 
 async before(user: User | null, action: string, ...params: any[]) { 
 if(user?.role == Role.ADMIN){ 
 return true
 } 
 }
 async get(user: User) {
    return user.role === Role.ADMIN || user.role === Role.USER ; // Explicit rule for destroy action
  }
 async destroy(user: User) {
    return user.role === Role.ADMIN; // Explicit rule for destroy action
  }
 async update(user: User) {
    return user.role === Role.ADMIN; // Explicit rule for destroy action
 }  
}