import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

export const connectDB = async () => {
  try {
    await sequelize.sync(/* { force: true } */);
    console.log("Database Connect successfully");
  } catch (e) {
    console.error("Error from database:", e.message);
  }
};
