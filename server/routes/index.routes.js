const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const profileRoutes = require("./profile.routes");
router.use("/profile", profileRoutes);

const opportunityRoutes = require("./opportunity.routes");
router.use("/opportunities", opportunityRoutes);

const companyRoutes = require("./company.routes");
router.use("/companies", companyRoutes);

module.exports = router;
