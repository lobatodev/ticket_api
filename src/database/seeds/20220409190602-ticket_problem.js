module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("ticket_problems", [
      {
        description: "Dinamômetro",
      },
      {
        description: "Conexão",
      },
      {
        description: "Bluetooth",
      },
      {
        description: "Permissão",
      },
      {
        description: "Tradução",
      },
      {
        description: "Outros",
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("ticket_problems", null, {});
  },
};
