const {Router} = require("express")
const { getAll,create } = require("../controllers/feedback.contoller")
const {isAuth} = require("../middlewares/isAuth.MD")
const router = Router()


router.post("/comment" ,isAuth, create)
router.get("/comment" ,isAuth,  getAll)
module.exports = router