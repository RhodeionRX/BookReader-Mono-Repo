'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.renameColumn(
        'books',
        'creatorAccountId',
        'creatorUserId',
        {
          transaction: t,
        },
      );

      await queryInterface.changeColumn(
        'books',
        'creatorUserId',
        {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        {
          transaction: t,
        },
      );
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.changeColumn(
        'books',
        'creatorUserId',
        {
          type: Sequelize.UUID,
          allowNull: true,
        },
        {
          transaction: t,
        },
      );

      await queryInterface.renameColumn(
        'books',
        'creatorUserId',
        'creatorAccountId',
        {
          transaction: t,
        },
      );
    });
  },
};
