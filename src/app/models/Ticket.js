import Sequelize, { Model } from 'sequelize';

class Ticket extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        id_requester: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        id_responsible: {
          type: Sequelize.INTEGER,
        },
        id_related: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        id_problem: {
          type: Sequelize.INTEGER,
        },
        id_criticidad: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        id_status: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'tickets',
      }
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'id_requester',
    });
    this.belongsTo(models.User, {
      foreignKey: 'id_responsible',
    });
    this.belongsTo(models.TicketStatus, {
      foreignKey: 'id_status',
    });
    this.belongsTo(models.TicketCriticidad, {
      foreignKey: 'id_criticidad',
    });
    this.belongsTo(models.TicketRelated, {
      foreignKey: 'id_related',
    });
    this.belongsTo(models.TicketProblem, {
      foreignKey: 'id_problem',
    });
  }

}
export default Ticket;
