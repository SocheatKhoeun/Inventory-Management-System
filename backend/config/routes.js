const authrouter = require("../Routers/authRouther");
const productrouter = require("../Routers/ProductRouter");
const orderrouter = require("../Routers/orderRouter");
const categoryrouter = require("../Routers/categoryRouter");
const notificationrouter = require("../Routers/notificationRouters");
const activityrouter = require("../Routers/activityRouter");
const inventoryrouter = require("../Routers/inventoryRouter");
const salesrouter = require("../Routers/salesRouter");
const supplierrouter = require("../Routers/supplierrouter");
const stocktransactionrouter = require("../Routers/stocktransactionrouter");

const setupRoutes = (app) => {
  // API routes
  app.use("/api/auth", authrouter);
  app.use("/api/product", productrouter);
  app.use("/api/order", orderrouter);
  app.use("/api/category", categoryrouter);
  app.use("/api/notification", notificationrouter);
  app.use("/api/inventory", inventoryrouter);
  app.use("/api/sales", salesrouter);
  app.use("/api/supplier", supplierrouter);
  app.use("/api/stocktransaction", stocktransactionrouter);

  console.log("✓ Routes configured successfully");
};

const setupActivityRoutes = (app) => {
  app.use("/api/activitylogs", activityrouter(app));
};

module.exports = { setupRoutes, setupActivityRoutes };
