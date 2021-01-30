const connection = require('./connection')

const runQuery = (query, params = '') => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (errors, results, fields) => {
            if (errors) {
                reject(errors)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = runQuery