import { Router } from "express";

const router = Router()

router.post('/login', async (req, res) => {
    const resData = await loginController(req)
    res.status(resData.status).send(resData.response)
})