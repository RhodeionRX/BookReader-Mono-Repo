import { Model } from "sequelize";
import { Column, DataType, Default, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'users',
    timestamps: true
})
export class User extends Model<User> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: true,
      })
      surname: string;
    
    @Column({
        type: DataType.STRING(25),
        allowNull: true,
    })
    nickname: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    updatedAt: Date;
}