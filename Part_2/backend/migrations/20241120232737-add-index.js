"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add index to the `userId` column in the `scores` table
    await queryInterface.addIndex("scores", ["userId"], {
      name: "scores_userId_idx",
    });

    // Add index to the `quizId` column in the `scores` table
    await queryInterface.addIndex("scores", ["quizId"], {
      name: "scores_quizId_idx",
    });

    // Add index to the `updatedAt` column in the `scores` table
    await queryInterface.addIndex("scores", ["updatedAt"], {
      name: "scores_updatedAt_idx",
    });

    // Add index to the `quizId` column in the `questions` table
    await queryInterface.addIndex("questions", ["quizId"], {
      name: "questions_quizId_idx",
    });

    // Add index to the `userId` column in the `users` table
    await queryInterface.addIndex("users", ["id"], {
      name: "users_id_idx",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the indexes if necessary
    await queryInterface.removeIndex("scores", "scores_userId_idx");
    await queryInterface.removeIndex("scores", "scores_quizId_idx");
    await queryInterface.removeIndex("scores", "scores_updatedAt_idx");
    await queryInterface.removeIndex("questions", "questions_quizId_idx");
    await queryInterface.removeIndex("users", "users_id_idx");
  },
};
