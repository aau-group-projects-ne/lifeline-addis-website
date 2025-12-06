const router = require('express').Router()

router.get("/staff/:id")

//only admin can do this
router.post("/staff")