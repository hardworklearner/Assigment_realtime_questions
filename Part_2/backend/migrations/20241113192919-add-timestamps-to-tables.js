module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check and add `createdAt` and `updatedAt` to `quizzes` table
    const quizzesTable = await queryInterface.describeTable("quizzes");
    if (!quizzesTable.createdAt) {
      await queryInterface.addColumn("quizzes", "createdAt", {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
    if (!quizzesTable.updatedAt) {
      await queryInterface.addColumn("quizzes", "updatedAt", {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }

    // Update timestamps for `quizzes` table
    await queryInterface.sequelize.query(
      `UPDATE quizzes SET "createdAt" = NOW(), "updatedAt" = NOW()`
    );

    // Enforce NOT NULL on timestamps for `quizzes` table
    if (!quizzesTable.createdAt) {
      await queryInterface.changeColumn("quizzes", "createdAt", {
        type: Sequelize.DATE,
        allowNull: false,
      });
    }
    if (!quizzesTable.updatedAt) {
      await queryInterface.changeColumn("quizzes", "updatedAt", {
        type: Sequelize.DATE,
        allowNull: false,
      });
    }

    // Check and add `createdAt` and `updatedAt` to `scores` table
    const scoresTable = await queryInterface.describeTable("scores");
    if (!scoresTable.createdAt) {
      await queryInterface.addColumn("scores", "createdAt", {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
    if (!scoresTable.updatedAt) {
      await queryInterface.addColumn("scores", "updatedAt", {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }

    // Update timestamps for `scores` table
    await queryInterface.sequelize.query(
      `UPDATE scores SET "createdAt" = NOW(), "updatedAt" = NOW()`
    );

    // Enforce NOT NULL on timestamps for `scores` table
    if (!scoresTable.createdAt) {
      await queryInterface.changeColumn("scores", "createdAt", {
        type: Sequelize.DATE,
        allowNull: false,
      });
    }
    if (!scoresTable.updatedAt) {
      await queryInterface.changeColumn("scores", "updatedAt", {
        type: Sequelize.DATE,
        allowNull: false,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove `createdAt` and `updatedAt` from `quizzes`
    const quizzesTable = await queryInterface.describeTable("quizzes");
    if (quizzesTable.createdAt) {
      await queryInterface.removeColumn("quizzes", "createdAt");
    }
    if (quizzesTable.updatedAt) {
      await queryInterface.removeColumn("quizzes", "updatedAt");
    }

    // Remove `createdAt` and `updatedAt` from `scores`
    const scoresTable = await queryInterface.describeTable("scores");
    if (scoresTable.createdAt) {
      await queryInterface.removeColumn("scores", "createdAt");
    }
    if (scoresTable.updatedAt) {
      await queryInterface.removeColumn("scores", "updatedAt");
    }
  },
};
