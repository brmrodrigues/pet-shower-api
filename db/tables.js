class Tables {
    init(connection) {
        this.connection = connection;
        this.createAppointments()
    }

    createAppointments() {
        const sql = 'CREATE TABLE IF NOT EXISTS appointments ' +
        '(id int NOT NULL AUTO_INCREMENT, ' +
        'client varchar(50) NOT NULL, ' +
        'pet varchar(20), ' +
        'service varchar(20) NOT NULL, ' + 
        'status varchar(20) NOT NULL, ' +
        'observacoes text, ' +
        'schedule_date datetime NOT NULL, ' +
        'creation_date datetime NOT NULL, ' +
        'PRIMARY KEY (id))'

        this.connection.query(sql, (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log('Table appointments created successfully')
            }
        })
    }
}

module.exports = new Tables