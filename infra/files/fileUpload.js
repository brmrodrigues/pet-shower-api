const fs = require('fs')
const path = require('path')

module.exports = (readPath, fileName, callbackImageUploaded) => {
    const validFileTypes = ['jpg', 'png', 'jpeg']
    const fileType = path.extname(readPath)
    const isFileTypeValid = validFileTypes.indexOf(fileType.substring(1)) !== -1

    if (isFileTypeValid) {
        const newPath = `./assets/images/${fileName}${fileType}`
    
        fs.createReadStream(readPath)
        .pipe(fs.createWriteStream(newPath)
        .on('finish', () => callbackImageUploaded(false, newPath)))
    } else {
        const error = 'Type is not valid!'
        callbackImageUploaded(error)
    }
}
