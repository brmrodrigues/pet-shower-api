const Appointment = require('../models/appointments')

module.exports = app => {
  app.get('/appointments', (req, res) => {
    Appointment.list(res)
  })

  app.get('/appointments/:id', (req, res) => {
    const id = parseInt(req.params.id)
    Appointment.findById(id, res)
  })

  app.post('/appointments', (req, res) => {
    const appointment = req.body
    Appointment.add(appointment, res)
  })

  app.patch('/appointments/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const values = req.body
    Appointment.modify(id, values, res)
  })

  app.delete('/appointments/:id', (req, res) => {
    const id = parseInt(req.params.id)
    Appointment.remove(id, res)
  })
}
