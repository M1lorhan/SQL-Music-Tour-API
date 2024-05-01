'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('meet_greets', {
      meet_greet_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'events',
          },
          key: 'event_id',
        },
        allowNull: false,
      },
      band_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'bands',
          },
          key: 'band_id',
        },
        allowNull: false,
      },
      meet_start_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('meet_greets');
  }
};