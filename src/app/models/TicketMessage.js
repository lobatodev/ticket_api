import Sequelize, { Model } from 'sequelize';

class TicketMessage extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_user: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        id_ticket: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        message: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'ticket_messages',
      }
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'id_user',
    });
    this.belongsTo(models.Ticket, {
      foreignKey: 'id_status',
    });
  }

}
export default TicketMessage;
