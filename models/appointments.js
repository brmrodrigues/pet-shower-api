const axios = require('axios')
const moment = require('moment')
const connection = require('../infra/db/connection')
const repository = require('../repositories/appointment')

class Appointment {

    constructor() {

        this.isScheduleDateValid = ({schedule_date, creation_date}) => moment(schedule_date).isSameOrAfter(creation_date)

        this.isClientValid = ({ length }) => {
            return length >= 5
        }

        this.validate = parameters => 
            this.validations.filter(field => {
                const { name }  = field
                const parameter = parameters[name]
                return !field.valid(parameter)
            })

        this.validations = [
            {
                name: 'schedule_date',
                valid: this.isScheduleDateValid,
                message: 'Schedule Date must be same or after current date!'
            },
            {
                name: 'client',
                valid: this.isClientValid,
                message: 'Client must have at least five characters'
            }
        ]
    }
    add(appointment) {
        const creation_date = moment().format('YYYY-MM-DD')
        const schedule_date = moment(appointment.schedule_date, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const parameters = {
            schedule_date: {schedule_date, creation_date},
            client: {length: appointment.client.length}
        }

        const validationErrors = this.validate(parameters)
        const hasErros = validationErrors.length

        if (hasErros) {
            return new Promise((resolve, reject) => {reject(validationErrors)})
        } else {
            const appointmentWithDate = {...appointment, creation_date, schedule_date}

            return repository.add(appointmentWithDate)
                .then(results => {
                    const id = results.insertId
                    return {... appointment, id}
                })
        }
    }

    list() {
        return repository.list()
    }

    findById(id) {
        return repository.findById(id)
                .then(async results => {
                        const appointment = results[0]
                        const cpf = appointment.client

                        const {data} = await axios.get(`http://localhost:8082/${cpf}`)
                        appointment.client = data
                        return appointment
                    })
    }

    modify(id, values, res) {
        if (values.schedule_date) {
            values.schedule_date = moment(values.schedule_date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE appointments SET ? WHERE id=?'

        connection.query(sql, [values, id], (error, results) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({...values, id})
            }
        })
    }

    remove(id, res) {
        const sql = 'DELETE FROM appointments WHERE id=?'

        connection.query(sql, id, (error, results) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Appointment