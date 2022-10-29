const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Paciente = mongoose.model('Paciente')

const CitaSchema = mongoose.Schema(
    {
        fecha: {
            type: String,
            required: true,
            trim: true
        },
        hora: {
            type: String,
            required: true
        },
        paciente: {
            type: Schema.ObjectId,
            ref: "Paciente"
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model("Cita", CitaSchema);