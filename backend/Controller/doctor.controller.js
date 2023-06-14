const { DoctorModel } = require("../Model/doctors.model")

const getDoctors = async (req, res) => {
    try {
        const data = await DoctorModel.find()
        res.status(201).send(data)
    } catch (error) {
        res.status(401).send({ "msg": "Bad Request 404", "ok": false, "err": error.message })
    }
}

const addDoctor = async (req, res) => {
    const payload = req.body
    const { name } = req.body
    try {
        const isDoctorPresent = await DoctorModel.findOne({name: name})
        if (isDoctorPresent) {
            return res.send({ "msg": "doctor is already present" })
        }
        const data = new DoctorModel(payload)
        await data.save()
        res.status(201).send({ "msg": "Doctor Added SuccesFully", "ok": true })
    } catch (error) {
        res.status(401).send({ "msg": "Bad Request 404", "ok": false, "err": error.message })

    }
}

const updateDoctor = async (req, res) => {
    const ID = req.params.id
    const Payload = req.body
    try {
        await DoctorModel.findByIdAndUpdate({ _id: ID }, Payload)
        res.status(201).send({ "msg": "Doctor Updated SuccesFully", "ok": true })

    } catch (error) {
        res.status(401).send({ "msg": "Bad Request 404", "ok": false, "err": error.message })

    }
}

const DeleteDoctor = async (req, res) => {
    try {
        const ID = req.params.id
        await DoctorModel.findByIdAndDelete({ _id: ID })
        res.status(201).send({ "msg": "Doctor Deleted SuccesFully", "ok": true })

    } catch (error) {
        // res.send(error.message)
        res.status(401).send({ "msg": "Bad Request 404", "ok": false, "err": error.message })

    }
}
// ! ................. Working On IT !!!!
//---------> Get Doctor Appointments <----------//

//------> doctor/appoint/:id

const getAppointments = async (req, res) => {
    try {
        const ID = req.params.id  
        let doctor = await DoctorModel.findById(ID).populate("appointments")

        if (!doctor) {
            return res.status(401).send({ "msg": "Doctor Not Found", "ok": false })
        }
        let appointments = doctor.appointments
        res.status(201).send(appointments)

    } catch (error) {
        console.log(error);
        res.status(401).send({ "msg": "Bad Request 404", "ok": false, "err": error.message })

    }
}

module.exports = { getDoctors, addDoctor, updateDoctor, DeleteDoctor, getAppointments }