const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {getAssetById, addAsset, sellAsset, getAllAssets} = require("../controllers/asset.controller.js");

router.get("/", verifyToken, getAllAssets);
router.get("/:id", verifyToken, getAssetById);
router.post("/", verifyToken, addAsset);

router.delete("/:id", verifyToken, sellAsset);

module.exports = router;