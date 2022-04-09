module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("ticket_criticidads", [
      {
        description: "Não priorizado",
      },
      {
        description: "Baixa",
      },
      {
        description: "Média",
      },
      {
        description: "Alta",
      },
      {
        description: "Urgente",
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("ticket_criticidads", null, {});
  },
};
