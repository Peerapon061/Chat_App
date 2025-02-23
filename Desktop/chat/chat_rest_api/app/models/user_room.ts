import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Room from './room.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class UserRoom extends BaseModel {
  @column({ isPrimary: true })
  declare roomId: number

  @column({ isPrimary: true })
  // @column({ isPrimary: true })
  declare memberId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Room, {
    foreignKey: 'roomId', // The column in UserRoom
  })
  declare roomDetail: BelongsTo<typeof Room>;
}