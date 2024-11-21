module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable("users");
    if (!tableInfo.createdAt) {
      await queryInterface.addColumn("users", "createdAt", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "createdAt");
  },
};
