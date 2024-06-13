const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {getAssetById, addAsset, deleteAsset, getAllAssets} = require("../controllers/asset.controller.js");

//Proteggo le route con il middleware verifyToken
router.use(verifyToken);

//Non facciamo il method ovverride 
router.get("/", getAllAssets);
router.get("/:id", getAssetById);
router.post("/", addAsset);

router.delete("/:id", deleteAsset);

module.exports = router;