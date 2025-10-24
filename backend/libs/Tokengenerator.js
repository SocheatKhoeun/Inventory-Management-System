const jwt = require("jsonwebtoken");

require("dotenv").config();

const generateToken = async (user, res) => {
  try {
    // ...validate inputs...
    if (!user || !user._id) {
      throw new Error("Invalid user object for token generation");
    }

    const secret = process.env.JWT_SECRET || process.env.SecretKey;
    if (!secret) {
      console.error("JWT secret is not configured (JWT_SECRET).");
      throw new Error("JWT secret not configured");
    }

    const payload = {
      userId: user._id,
      role: user.role || "staff",
    };

    // create token
    const token = jwt.sign(payload, secret, { expiresIn: "7d" });

    // set cookie if response object provided
    if (res && typeof res.cookie === "function") {
      const isProd = process.env.NODE_ENV === "production";
      res.cookie("Inventorymanagmentsystem", token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    }

    return token;
  } catch (err) {
    console.error(
      "Token generation error:",
      err && err.message ? err.message : err
    );
    throw new Error(
      "Failed to generate token: " + (err && err.message ? err.message : err)
    );
  }
};

module.exports = generateToken;
