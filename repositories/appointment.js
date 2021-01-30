const query = require('../infra/db/queries')

class Appointment {
    add(appointment) {
        const sql = 'INSERT INTO appointments SET ?'
        query(sql, appointment)
    }

    list() {
        const sql = 'SELECT * FROM appointments'
        query(sql)
    }
}

module.exports = new Appointment()