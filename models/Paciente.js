const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Doctor = mongoose.model('Doctor');

const PacienteSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            trim: true, 
            unique: true
        },
        sexo: {
            type: String
        },
        identificacion: {
            type: Number
        },
        telefono: {
            type: Number
        },
        creador: {
            type: Schema.ObjectId, 
            ref: "Doctor",
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model("Paciente", PacienteSchema);
