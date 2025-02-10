const express = require("express");
const { roles } = require("../../../../models");
const router = express.Router();
let api_version = process.env.API_VERSION;



let createController = require("../../../../controllers/"+api_version+"/activity/create.controllers");

router.post("/create",createController.createRole);


module.exports = router;
