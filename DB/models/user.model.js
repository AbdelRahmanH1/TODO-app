import bcryptjs from "bcryptjs";
import { DataTypes } from "sequelize";
import { sequelize } from "../connectDB.js";
const UserModel = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "This field can't be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        args: true,
        msg: "Email must be unique",
      },
      validate: {
        isEmail: {
          msg: "Must add a email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 20],
          msg: "Password must be between 5 and 20",
        },
      },
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["male", "female"]],
          msg: "Gender must be male or female",
        },
      },
    },
  },
  {
    indexex: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
    timestamps: true,
  }
);
UserModel.beforeSave(async (user) => {
  if (user.changed("password")) {
    const hashpassword = bcryptjs.hashSync(
      user.password,
      parseInt(process.env.SALT_ROUND)
    );
    user.password = hashpassword;
  }
});
export default UserModel;
