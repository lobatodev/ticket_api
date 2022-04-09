module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("user_types", [
      {
        description: "Administrador",
      },
      {
        description: "Responsável",
      },
      {
        description: "Solicitante",
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("user_types", null, {});
  },
};
