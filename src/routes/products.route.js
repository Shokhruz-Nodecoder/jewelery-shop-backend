const {Router} = require("express")
const {showProducts, create} = require("../controllers/products.controller")

const {isAdmin} = require("../middlewares/isAdmin.MD")
const router = Router()

router.post("/product",isAdmin, create)
router.get("/showProducts", isAdmin, showProducts)

module.exports = router