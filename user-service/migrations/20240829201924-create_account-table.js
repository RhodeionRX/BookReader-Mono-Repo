'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        primaryKey: true, 
        type: Sequelize.UUID
      },
      login: {
        allowNull: false,
        type: Sequelize.TEXT 
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        onUpdate: Sequelize.fn('NOW')
      },
    })

    await queryInterface.addColumn('users', 'accountId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'accounts',
        key: 'id'
      },
      onUpdate: 'CASCADE', 
      onDelete: 'SET NULL',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('account');
    await queryInterface.removeColumn('users', 'accountId');

  }
};
