module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("ticket_relateds", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable("ticket_relateds");
  },
};
