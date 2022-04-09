import Sequelize, { Model } from 'sequelize';

class TicketStatus extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'ticket_status',
      }
    );
  }
}
export default TicketStatus;
