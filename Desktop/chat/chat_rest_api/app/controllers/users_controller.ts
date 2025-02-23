import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerUserValidator } from '#validators/user'
export default class UsersController {
    async login({ auth, request }: HttpContext) {
        const { username, password } = request.all()
        const user = await User.verifyCredentials(username, password)
        // to generate a token 
        return await auth.use('jwt').generate(user)
    }
    async register({ request, response }: HttpContext) {
        try {
            const payload = await request.validateUsing(registerUserValidator)
            const user = await User.create({ username: payload.username, password: payload.password, role: payload.role })
            response.ok({messages:'The user is register successfully.'})
        } catch (error) {
            response.badRequest(error.messages)
        }
    }
    async list({ bouncer,response }: HttpContext) {
        const user = await User.query()
        await bouncer.with('AdminBasePolicy').authorize('get')
        return response.ok(user)
    }

    async listAllExceptUserById({ auth,bouncer,response }: HttpContext) {
        const user = auth.getUserOrFail()
        const users = await User.query().whereNot('id',user.id)
        await bouncer.with('AdminBasePolicy').authorize('get')
        return response.ok(users)
    }

    async getSpecificUserById({ bouncer,response,params }: HttpContext) {
        const id = params.id
        const user = await User.query().where('id',id).firstOrFail()
        await bouncer.with('AdminBasePolicy').authorize('get')
        return response.ok(user)
    }
    async update({ bouncer,response,params,request }: HttpContext) {
        try {
            const id = params.id
            const payload = await request.validateUsing(registerUserValidator)
            await bouncer.with('AdminBasePolicy').authorize('update')
            const user = await User.query().where('id',id).firstOrFail()
            user.username=payload.username
            user.password=payload.password
            user.role=payload.role
            user.save()
            // await User.create({ username: payload.username, password: payload.password, role: payload.role })
            response.ok('The user is updated successfully.')
        } catch (error) {
            response.badRequest(error.messages)
        }
    }

    async destroy({ auth,bouncer,params }: HttpContext) {
        auth.getUserOrFail()
        const id = params.id
        const user = await User.query()
            // .where('userId',user.id) 
            .where('id', id)
            .first()
        await bouncer.with('AdminBasePolicy').authorize('destroy')
        await user?.delete()
    }
}