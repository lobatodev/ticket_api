import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        google_id: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        id_user_type: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'users',
      }
    );
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
  static associate(models) {
    this.belongsTo(models.UserType, {
      foreignKey: 'id_user_type',
    });
  }

  async checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User;
