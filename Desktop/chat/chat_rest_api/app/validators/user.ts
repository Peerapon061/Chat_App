import vine from '@vinejs/vine'
import Role from '../../contact/Role.js'

const schema =  vine.object({
    username: vine.string().minLength(6).unique( async(db, value, field)=>{
        const user = await db.from('users')
                             .where('username',value)
                             .first()
        return !user
    }),
    password: vine.string().minLength(6).confirmed(),
    role: vine.enum(Role)
})

export const registerUserValidator = vine.compile(schema)