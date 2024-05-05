'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stage_events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Stage, Event}) {
      // define association here
      Stage_events.belongsTo(Stage, {
        foreignKey: "stage_id",
        as: "stage"
      })
      Stage_events.belongsTo(Event, {
        foreignKey: "event_id",
        as: "event"
      })
    }
  }
  Stage_events.init({
    stage_events_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stage_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Stage_events',
    tableName: 'stage_events',
    timestamps: false
  });
  return Stage_events;
};