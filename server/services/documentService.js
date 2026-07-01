const mammoth = require("mammoth")


async function extractText(filePath){
    const result = await mammoth.extractRawText({
        path: filePath
    })
    return result.value
}

module.exports = {extractText}