import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 'Users',
  underscored: true,
})
export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @Unique
  @Column(DataType.STRING)
  username: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  createdBy: string;

  @Column(DataType.STRING)
  updatedBy: string;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.DATE)
  deletedAt: Date;

  @Column(DataType.STRING)
  deletedBy: string;
}
