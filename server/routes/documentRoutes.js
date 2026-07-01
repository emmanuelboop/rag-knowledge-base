require("dotenv").config()

const express = require("express")
const multer = require("multer")
const pool = require("../db/db")
const jwt = require("jsonwebtoken")
const { extractText } = require("../services/documentService")
const { generateResponse } = require("../services/openaiService")
const { chunkText } = require("../services/chunkService")
const { generateEmbedding } = require("../services/embeddingService")


const upload = multer({
    dest: "uploads/",
});

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            success: false
        })
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(token, JWT_SECRET)

    req.user = decoded

    next()
}

router.post("/upload", authenticate, upload.single("file"), async (req, res) => {
    console.log("file from frontend: ", req.file);
    console.log(req.user)
    const user_id = req.user.userID
    const file_name = req.file.originalname
    const file_path = req.file.path
    const response = await pool.query("INSERT INTO documents(user_id, file_name, file_path) VALUES($1,$2,$3) RETURNING *",
        [user_id, file_name, file_path])
    console.log("response: ", response.rows[0])

    const extractedText = await extractText(file_path)
    console.log("extracted text: ", extractedText)

    const chunkedText = chunkText(extractedText)
    console.log("chunked text: ", chunkedText.length)

    for (const chunk of chunkedText) {
        const textEmbedding = await generateEmbedding(chunk)
        await pool.query(
            "INSERT INTO document_chunks(document_id, chunk_text, embedding) VALUES($1,$2,$3)",
            [response.rows[0].id, chunk, JSON.stringify(textEmbedding)]
        )
    }

    console.log("embedding added")


    res.json({
        success: true,
        data: response.rows[0]
    });
}
);

router.get("/", authenticate, async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM documents WHERE user_id = $1 ORDER BY uploaded_at DESC", [req.user.userID])
        console.log("psql: ", response.rows)

        res.json({
            success: true,
            data: response.rows
        })
    } catch (error) {
        res.status(400).json({
            success: false,
        })
    }
})

router.put("/:id/rename", authenticate, async (req, res) => {
    try {
        console.log("new document name: ",req.body.documentName)
        const result = await pool.query(`
                UPDATE documents
                SET file_name = $1
                WHERE id = $2
                AND user_id = $3
                RETURNING *
            `, [req.body.documentName, req.params.id, req.user.userID])
        
        console.log("document details: ",result.rows)

        res.json({
            success: true,

        })
    } catch (error) {
        console.log("error: ",error)
        res.json({
            success: false,
            data: "server error "+error
        })
    }
})

router.delete("/:id", authenticate, async (req, res) => {
    try{
        await pool.query(`
                DELETE FROM documents
                WHERE id = $1
                AND user_id = $2
            `,
        [req.params.id, req.user.userID])
        
        res.json({
            success: true,

        })
    }catch(error){
        console.log("error: ",error)
        res.json({
            success: false
        })
    }
})

router.get("/:id/conversation", authenticate, async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM conversations WHERE document_id=$1", [req.params.id])
        console.log("psql rows result: ", result.rows)
        res.json({
            success: true,
            data: result.rows
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "server error"
        })
    }

})

router.post("/:id/conversation", authenticate, async (req, res) => {
    try {
        const result = await pool.query(
            "INSERT INTO conversations(user_id, document_id, role, message) VALUES($1,$2,$3,$4) RETURNING *",
            [req.user.userID, req.params.id, req.body.role, req.body.content])

        const savedUserMessage = result.rows[0]

        const userMessageEmbedding = await generateEmbedding(req.body.content)

        const similarChunks = await pool.query(
            `SELECT dc.chunk_text 
            FROM document_chunks dc 
            JOIN documents d 
            ON dc.document_id = d.id
            WHERE dc.document_id=$1 
            AND d.user_id=$2 
            ORDER BY dc.embedding <=> $3 
            LIMIT 5`,
            [req.params.id, req.user.userID, JSON.stringify(userMessageEmbedding)]
        )

        console.log("similar chunks: ", similarChunks.rows)

        const context = similarChunks.rows.map((chunk) => chunk.chunk_text).join("\n\n")
        console.log("context: ", context)

        const allMessages = await pool.query("SELECT * FROM conversations WHERE document_id=$1", [req.params.id])

        const conversationHistory = allMessages.rows.map(msg => ({
            role: msg.role,
            content: msg.message
        }))

        const messages = [
            {
                role: "system",
                content: "Answer only using the provided context"
            },
            {
                role: "system",
                content: context
            },
            ...conversationHistory
        ]

        console.log("conversation to send to openai: ", messages)

        const assistantResponse = await generateResponse(messages)
        console.log("assistant response: ", assistantResponse)

        const assistantResult = await pool.query(
            "INSERT INTO conversations(user_id, document_id, role, message) VALUES($1,$2,$3,$4) RETURNING *",
            [req.user.userID, req.params.id, "assistant", assistantResponse])

        const savedAssistantMessage = assistantResult.rows[0]
        console.log("assistantResult: ", assistantResult.rows[0])

        res.json({
            success: true,
            userMessage: savedUserMessage,
            assistantMessage: savedAssistantMessage
        })

    } catch (error) {
        console.log("server error: ", error)
        res.status(400).json({
            success: false,
            message: "server error"
        })
    }

})

module.exports = router



