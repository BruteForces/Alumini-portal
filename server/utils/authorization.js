import jst from "jsonwebtoken";

export const generateToken = (id) => {
  const token = jst.sign({ id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "60 days",
  });

  return token;
};
