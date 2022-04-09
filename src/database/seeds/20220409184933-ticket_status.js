module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("ticket_status", [
      {
        description: "Novo",
      },
      {
        description: "Em andamento",
      },
      {
        description: "Resolvido",
      },
      {
        description: "Aguardando cliente",
      },
      {
        description: "Resolução em andamento",
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("ticket_status", null, {});
  },
};
