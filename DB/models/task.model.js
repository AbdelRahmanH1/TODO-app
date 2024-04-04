import { DataTypes } from "sequelize";
import { sequelize } from "../connectDB.js";
import UserModel from "./user.model.js";
const TaskModel = sequelize.define(
  "task",
  {
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(100),
      defaultValue: "No description avaliable",
      allowNull: true,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["title"],
      },
    ],
    timestamps: true,
  }
);
UserModel.hasMany(TaskModel, {
  foreignKey: {
    name: "userID",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
TaskModel.belongsTo(UserModel, {
  foreignKey: {
    name: "userID",
    allowNull: false,
  },
});

export default TaskModel;
