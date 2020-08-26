module.exports = {
  port: process.env.PORT || 3000,
  secret: "faztwebblog",
  database: process.env.MONGODB_URI || "mongodb://localhost/jwt-test",
  adminEmail: "fazt@faztweb.com",
  adminPassword: "password",
};
