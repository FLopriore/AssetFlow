const express = require("express");
const router = express.Router();
const {getAssetById, addAsset, sellAsset, getAllAssets} = require("../controllers/asset.controller.js");

router.get("/",getAllAssets);
router.get("/:id",getAssetById);

router.post("/",addAsset);

router.delete("/:id",sellAsset);

module.exports = router;