'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const I18nEnum = {
      ENGLISH: 'ENGLISH',
      RUSSIAN: 'RUSSIAN',
      UKRAINIAN: 'UKRAINIAN',
      POLISH: 'POLISH',
      SPANISH: 'SPANISH'
    };

    await queryInterface.createTable('book_parameters', {
      i18n: {
        type: Sequelize.ENUM(...Object.values(I18nEnum)),
        allowNull: false,
        primaryKey: true,  
      },
      label: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      bookId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'books',
          key: 'id',
        },
        primaryKey: true, 
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        onUpdate: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('book_parameters');
  },
};
