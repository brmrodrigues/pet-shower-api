class Tables {
    init(connection) {
        this.connection = connection;
        this.createAppointments()
        this.createPets()
    }

    createAppointments() {
        const sql = 'CREATE TABLE IF NOT EXISTS appointments ' +
        '(id int NOT NULL AUTO_INCREMENT, ' +
        'client varchar(11) NOT NULL, ' +
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

    createPets() {
        const query = 'CREATE TABLE IF NOT EXISTS pets ' + 
        '(id int NOT NULL AUTO_INCREMENT, ' +
        'name varchar(50), ' +
        'image varchar(200), ' +
        'PRIMARY KEY (id))'
        
        this.connection.query(query, error => {
            if (error) {
                console.log(error)
            } else {
                console.log('Table pets created succesfully')
            }
        })
    }
}

module.exports = new Tables