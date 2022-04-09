module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("users", [
      {
        username: "admin",
        name: "Administrador",
        email: "admin@mail.com",
        password_hash:
          "$2a$08$dt6.sX9ahPTf2kjYSEHN8.pHjwRzI1TR6lOLMoGyXWpvqVhE2gwjy", //admin
        id_user_type: 1,
        uuid: "bc43d264-25fb-4076-9450-a318055ee201",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "resp",
        name: "Responsável",
        email: "resp@mail.com",
        password_hash:
          "$2a$08$LX2IRsFUvEc8LiSaUV.Pguv5OxJkXFwHGYrgbO0WXI..jqnKomndq", //resp
        id_user_type: 2,
        uuid: "bc43d264-25fb-4076-9450-a318055ee202",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "solicitante",
        name: "Solicitante",
        email: "soli@mail.com",
        password_hash:
          "$2a$08$RVV9EW7Z5oGmCJbgEjVHiOtFZorBZMsZb0XZgLMX5AeLzMiyOHhIq", // soli
        id_user_type: 3,
        uuid: "bc43d264-25fb-4076-9450-a318055ee203",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
