require("dotenv").config()

const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const pool = require("../db/db")


const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET
console.log(JWT_SECRET)


router.post("/signup", async (req, res) => {
    try {
        console.log("req from frontend: ", req.body)
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password

        const hashedPassword = await bcrypt.hash(password, 10)
        console.log("hashed password: ", hashedPassword)

        await pool.query("INSERT INTO users(username, email, password) VALUES($1, $2, $3)", [username, email, hashedPassword])

        res.json({
            success: true,
            data: "auth successful"
        })
    } catch (error) {
        console.log("an error occurred: ", error.code)
        if (error.code === "23505") {
            return res.status(400).json({
                success: false,
                data: "username already exists"
            })
        }
        res.status(400).json({
            success: false,
            message: "server error"
        })

    }
})

router.post("/login", async (req, res) => {
    console.log("req from frontend: ", req.body)
    const username = req.body.username
    const password = req.body.password

    if (!username.trim() || !password.trim()) {
        return res.status(400).json({
            success: false,
            message: "username or password is required"
        })
    }

    const databaseResult = await pool.query("SELECT * FROM users where username = $1",
        [username]
    )

    //console.log("result: ", databaseResult.rows[0])

    if (databaseResult.rows.length === 0) {
        return res.status(400).json({
            success: false,
            message: "username not found"
        })
    }

    const passwordMatches = await bcrypt.compare(password, databaseResult.rows[0].password)
    if (!passwordMatches) {
        return res.status(400).json({
            success: false,
            message: "password not found"
        })
    }

    const token = jwt.sign(
        {
            userID: databaseResult.rows[0].id,
            username: databaseResult.rows[0].username
        },
        JWT_SECRET
    )

    res.json({
        success: true,
        token: token,
    })
})



module.exports = router;
