import Token from "../../DB/models/token.model.js";
import User from "../../DB/models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
const authentication = asyncHandler(async (req, res, next) => {
  let { token } = req.headers;

  if (!token || !token.startsWith(process.env.Barrer_KEY))
    return next(new Error("Token Wrong", { cause: 403 }));

  token = token.replace(process.env.Barrer_KEY, "");
  const tokenDB = await Token.findOne({
    where: { token, isValid: true },
    include: [{ model: User, attributes: ["id", "username", "email"] }],
  });

  if (!tokenDB) return next(new Error("Invalid Token", { cause: 403 }));
  req.user = tokenDB.user.dataValues;

  return next();
});

export default authentication;
