import { BaseSchema } from '@adonisjs/lucid/schema'
import Role from '../../contact/Role.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('username', 254).notNullable().unique()
      table.string('password').notNullable()
      table.enum('role', [Role.ADMIN, Role.USER]).notNullable().defaultTo(Role.USER);
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}