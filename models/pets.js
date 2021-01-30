const connection = require('../infra/db/connection')
const fileUpload = require('../infra/files/fileUpload')

class Pet {
    add(pet, res) {
        const query = 'INSERT INTO pets SET ?'
        fileUpload(pet.image, pet.name, (error, newPath) => {
            if (error) {
                res.status(400).json({error})
            } else {
                const newPet = {name: pet.name, image: newPath}
                connection.query(query, newPet, error => {
                    if (error) {
                        console.log(error)
                        res.status(400).json()
                    } else {
                        res.status(200).json(newPet)
                    }
                })
            }
        })
    }
}

module.exports = new Pet()