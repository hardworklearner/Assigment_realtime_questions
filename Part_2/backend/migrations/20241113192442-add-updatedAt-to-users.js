module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable("users");
    if (!table.updatedAt) {
      await queryInterface.addColumn("users", "updatedAt", {
        type: Sequelize.DATE,
        allowNull: true,
      });

      await queryInterface.sequelize.query(`
        UPDATE users SET "updatedAt" = NOW()
      `);

      await queryInterface.changeColumn("users", "updatedAt", {
        type: Sequelize.DATE,
        allowNull: false,
      });
    } else {
      console.log("The column 'updatedAt' already exists, skipping migration.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable("users");
    if (table.updatedAt) {
      await queryInterface.removeColumn("users", "updatedAt");
    }
  },
};
