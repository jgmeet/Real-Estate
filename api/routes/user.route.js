import express from "express"

const router = express.Router();

router.get('/', (req, res) => {
    res.send("you are on correct route")
})

export default router;