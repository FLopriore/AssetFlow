const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {getAssetById, addAsset, deleteAsset, getAllAssets} = require("../controllers/asset.controller.js");

router.use(verifyToken);

router.get("/", getAllAssets);
router.get("/:id", getAssetById);
router.post("/", addAsset);

router.delete("/:id", deleteAsset);

module.exports = router;