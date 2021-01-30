const express = require('express')
const bodyparser = require('body-parser')

const app = new express()
const faker = require('faker')

app.use(bodyparser())

app.get('/:cpf', (req, res) => {
    const { cpf } = req.params

    res.status(200).json({
        cpf,
        name: faker.name.findName(),
        birthday: faker.date.past()
    })
})

app.listen(8082, () => console.log('Clients API running!'))