const moment = require('moment')
const connection = require('../db/connection')

class Appointment {
    add(appointment, res) {
        const creation_date = moment().format('YYYY-MM-DD HH:MM:SS')
        const schedule_date = moment(appointment.schedule_date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const isScheduleDateValid = moment(schedule_date).isSameOrAfter(creation_date)
        const isClientValid = appointment.client.length >= 5

        const validations = [
            {
                name: 'schedule_date',
                valid: isScheduleDateValid,
                message: 'Schedule Date must be same or after current date!'
            },
            {
                name: 'client',
                valid: isClientValid,
                message: 'Client must have at least fice characters'
            }
        ]

        const validationErrors = validations.filter(field => !field.valid)
        const hasErros = validationErrors.length

        if (hasErros) {
            res.status(400).json(validationErrors)
        } else {
            const appointmentWithDate = {...appointment, creation_date, schedule_date}

            const sql = 'INSERT INTO appointments SET ?'

            connection.query(sql, appointmentWithDate, (error, results) => {
                if (error) {
                    res.status(400).json(error)
                } else {
                    res.status(201).json(results)
                }
            })
        }
    }

    list(res) {
        const sql = 'SELECT * FROM appointments'

        connection.query(sql, (error, results) => {
            if (error) {
                res.status(400).json()
            } else {
                res.status(200).json(results)
            }
        })
    }

    findById(id, res) {
        const sql = `SELECT * FROM appointments WHERE id=${id}`

        connection.query(sql, (error, results) => {
            const appointment = results[0]
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(appointment)
            }
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