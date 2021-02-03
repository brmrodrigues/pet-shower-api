const query = require('../infra/db/queries')

class Appointment {
    add(appointment) {
        const sql = 'INSERT INTO appointments SET ?'
        return query(sql, appointment)
    }

    list() {
        const sql = 'SELECT * FROM appointments'
        return query(sql)
    }

    findById(id) {
        const sql = `SELECT * FROM appointments WHERE id=${id}`
        return query(sql)
    }
}

module.exports = new Appointment()