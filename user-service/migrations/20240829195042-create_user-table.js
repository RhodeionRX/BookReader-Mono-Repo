'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false, 
        primaryKey: true, 
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING(20), 
        allowNull: false
      },
      surname: {
        type: Sequelize.STRING(20), 
        allowNull: true
      },
      nickname: {
        type: Sequelize.STRING(25), 
        allowNull: true
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
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
};
