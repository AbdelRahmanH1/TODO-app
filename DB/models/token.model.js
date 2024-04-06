import { DataTypes } from "sequelize";
import { sequelize } from "../connectDB.js";
import UserModel from "./user.model.js";

const tokenModel = sequelize.define(
  "token",
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isValid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "User ID is required",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

tokenModel.belongsTo(UserModel, { foreignKey: "userId", onDelete: "CASCADE" });

export default tokenModel;
