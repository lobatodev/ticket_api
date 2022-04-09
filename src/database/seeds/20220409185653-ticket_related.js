module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("ticket_relateds", [
      {
        description: "Alê",
      },
      {
        description: "App E-lastic",
      },
      {
        description: "Web E-lastic",
      },
      {
        description: "Dinamômetro",
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("ticket_relateds", null, {});
  },
};
