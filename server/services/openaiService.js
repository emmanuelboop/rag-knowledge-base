const Openai = require("openai")

const openai = new Openai({
    apiKey: process.env.OPENAI_API_KEY
})

async function generateResponse(messages){
    const completion = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages
    })

    return completion.choices[0].message.content
}

module.exports = {
    generateResponse
}