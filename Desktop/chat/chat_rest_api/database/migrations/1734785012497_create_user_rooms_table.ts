import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_rooms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('room_id').unsigned().notNullable().references('id').inTable('rooms').onDelete('CASCADE')
      table.integer('member_id').unsigned().notNullable().references('id').inTable('users')
      table.timestamp('created_at')

      table.primary(['member_id', 'room_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}